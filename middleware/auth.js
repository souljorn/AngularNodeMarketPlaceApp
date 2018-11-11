const app = require('../server.js');
const jwt = require('jsonwebtoken');
const Accounts   = require('../model/accounts'); // get our mongoose model
let token;

// route middleware to verify a token
  exports.use(function(req, res, next) {

    let token = req.headers['authorization'];
    if (token) {
      //decode token
      token = token.replace('Bearer ', '');
      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });

    }
  });
