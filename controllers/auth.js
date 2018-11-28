const express = require('express');
const app = require('../server.js');
const jwt = require('jsonwebtoken');
const Accounts   = require('../model/accounts'); // get our mongoose model
var CryptoTS = require("crypto-ts");
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
      console.log("if the user doesn't exits fail");
      if(!account){
        console.log("user failed");
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      console.log("req.body.password: " + req.body.password);
      console.log("Salt: " + account.salt);
      const passw = req.body.password + '';
      const salty = account.salt + ''
      const encryptedPassword = passw + salty;
      console.log("encryptedPassword: " + encryptedPassword);
      const check = CryptoTS.AES.encrypt(passw, salty).toString();
      console.log("check: " + check);
      console.log("correct encryptedPassword: " + account.password);
      console.log("In here");
      if(encryptedPassword !== account.password + ''){
        console.log("password failed");
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      console.log(req.body.password);
      console.log(account.password);
      if(encryptedPassword === account.password + ''){
        console.log("password found");

        console.log("account email: " + account.email);
        console.log("password is right: " + account.password);

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
  let token = req.headers['authorization'];
  if(!token)
    return res.status(401).json({
      message: "No token, Please Login",
      decoded: null
    })

  else if (token) {

    //decode token
    token = token.replace('Bearer ', '');
    console.log(token);
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({Error:err, message:"Error"});
      } else {
        // if everything is good, save to request for use in other routes
        return res.status(203).json({ success: true, message: 'Authenticated User.', decoded: decoded });
      }
    });
  }
};

