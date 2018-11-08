const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts');


router.get('/accounts', controller.allUsers);
router.post('/accounts', controller.createAccount);

module.exports = router;
