const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const controller = require('../controllers/images');



// a simple test url to check that all of our files are communicating correctly.
router.get('/image', controller.allImages);
router.get('/image/:filename', controller.getImage);
router.post('/image', controller.upload.single('file'), controller.imageUpload);


module.exports = router;
