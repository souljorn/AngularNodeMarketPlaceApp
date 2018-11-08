const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

router.post('/login', controller.login);
router.post('/verify', controller.verifyUser);


module.exports = router;
