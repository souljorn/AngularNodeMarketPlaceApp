const express = require('express');
const router = express.Router();
const controller = require('../controllers/message');

router.get('/items', controller.getAllItems);
router.post('/items', controller.createItem);
router.get('/items/title/:title', controller.getSingleItem);

module.exports = router;
