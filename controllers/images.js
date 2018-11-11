const path = require('path');
const crypto = require('crypto');
const mongoose =require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const app = require('../server');

app.use(methodOverride('_method'));
const mongoURI = app.get('URI');

const conn = mongoose.createConnection(mongoURI);

//Init grid fs Stream
let gfs;

conn.once('open',() => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

//Storage object
const storage = new GridFsStorage({
  url: mongoURI,
  file :(req, file) => {
    //return promise
    return new Promise((resolve, reject)=>{
      //Generate Names for files
      crypto.randomBytes(16, (err, buf) => {
        //If error promise rejector
        if (err){
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

exports.allImages = (req, res) => {
  gfs.files.find().toArray((err, files) => {
    //Check if file exists
    if(!files || files.length ===0){
      return res.status(404).json({
        err:'no files exist'
      });
    }
    else{
      //file exists
      return res.json(files);
    }
  })
};

exports.getImage = (req, res) => {
  gfs.files.findOne({filename: req.params.filename},(err, file) => {
    if(!file || file.length === 0){
      return res.status(404).json({
        err:'No file exists'
      });
    }
    else{
      //file exists

      //check if is image
      if(file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        //read output to browser
        const readstream = gfs.createReadStream(file.filename);
        //Pipe the image through the response
        readstream.pipe(res);
      }
      else{
        res.status(404).json({
          err: 'Not an image'
        })
      }

    }
  })
};

//multer get passed storage object
exports.upload = multer({ storage});

exports.imageUpload = function(req, res){
  res.json({file: req.file});
};





