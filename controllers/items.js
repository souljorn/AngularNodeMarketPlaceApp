const Items = require('../model/items');

//*************************Item API**************************************************

//********create items***************
exports.createItem = (req, res) => {
  let data = new Items(
    {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      seller: req.body.seller,
      category: req.body.category,
      image: req.body.image,
      address: req.body.address,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country
    }
  );

  Items.create(data).then(item => {
    if(item)
      res.status(200).json(item);
  })
    .catch(err => {
      res.status(500).send(err);
    });
};

//**********Get all items
exports.getAllItems =  (req, res) => {
  Items.find({}, function(err, items) {
    res.status(200).json(items);
    JSON.parse(JSON.stringify(items));
    console.log("Users api hit");
    console.log(JSON.parse(JSON.stringify(items)));
  });
};

//*******Get a Single item by title***********
exports.getSingleItem = (req, res) => {
  const requestedItem = req.params['title'];

  //res.send({ title: requestedItem });
  Items.findOne({title: requestedItem})
    .exec()
    .then(item => {
      //if the user doesn't exits fail
      if(!item){
        console.log("item does not exist");
        return res.status(401).json({
          message: 'item does not exist'
        });
      }
      else{
        return res.status(200).json(item);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'item does not exits'
      });
    });
};
