const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts');


router.get('/accounts', controller.allUsers);
router.get('/accounts/:email', controller.getUser);
router.post('/accounts', controller.createAccount);
router.post('/accounts/:email', controller.updateUser);
module.exports = router;
