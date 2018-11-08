const express = require('express');
const app = require('../server.js');
const jwt = require('jsonwebtoken');
const Accounts   = require('../model/accounts'); // get our mongoose model
let token;

//*************************Auth Api**************************************************
//This is the Login API that checks credentials and creates a session token
//The token is stored in local memory on the client computer and can be checked any time.
exports.login = (req, res, next) => {
  console.log("email: " + req.body.email);
  console.log("password: " + req.body.password);

  Accounts.findOne({email: req.body.email})
    .exec()
    .then(account => {
      //if the user doesn't exits fail
      if(!account){
        console.log("user failed");
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      if(req.body.password != account.password){
        console.log("password failed");
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      console.log(req.body.password);
      console.log(account.password);

      if(req.body.password == account.password){
        console.log("password found");

        console.log("account email: " + account.email);
        console.log("account password: " + account.password);

        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          email: account.email
        };

        //Todo add payload to the token to use for getting user profile later
        //Todo Will want to attach a user to the token so only the user attached to the token
        //Todo can access their profile
        token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: '180m' // expires in 3hours
        });


        console.log(token);
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
      else {
        res.status(401).json({
          message: 'Auth failed'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'Auth failed'
      });
    });
};

//************************************Token Validation*******************************
//This is an api endpoint that verifies that a token is valid and returns the users's email in a response
exports.verifyUser = (req, res) => {
  //token embedded with header
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];

  //decode token

  if (token) {
    // verifies secret and checks exp
    var decoded = jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        return res.status(200).send({
          success: true,
          message: 'Good token provided.',
          payload: decoded
        });
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
};

// // route middleware to verify a token
// apiRoutes.use(function(req, res, next) {
//
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   // decode token
//   if (token) {
//
//     // verifies secret and checks exp
//     jwt.verify(token, app.get('superSecret'), function(err, decoded) {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       } else {
//         // if everything is good, save to request for use in other routes
//         req.decoded = decoded;
//         next();
//       }
//     });
//
//   } else {
//
//     // if there is no token
//     // return an error
//     return res.status(403).send({
//       success: false,
//       message: 'No token provided.'
//     });
//
//   }
// });
