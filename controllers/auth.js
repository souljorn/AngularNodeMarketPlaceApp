const express = require('express');
const app = require('../server.js');
const jwt = require('jsonwebtoken');
const Accounts   = require('../model/accounts'); // get our mongoose model
var CryptoJS = require("crypto-js");
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
      console.log("req.body.password: You are here " + req.body.password);


      var keySize = 256;
      var iterations = 100;

      var password = account.salt + '';
      function decrypt (transitmessage, pass) {
        var salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
        var iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
        var encrypted = transitmessage.substring(64);

        var key = CryptoJS.PBKDF2(pass, salt, {
          keySize: keySize/32,
          iterations: iterations
        });

        var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
          iv: iv,
          padding: CryptoJS.pad.Pkcs7,
          mode: CryptoJS.mode.CBC

        })
        return decrypted;
      }
      console.log("but");
      var decrypted = decrypt(account.password + '', password);
      console.log("decrypted" + decrypted)
      console.log("decryptedtostring" + decrypted.toString())
      console.log("decrypted base64" + decrypted.toString(CryptoJS.enc.Base64))
      /*console.log("decrypted utf8" + decrypted.toString(CryptoJS.enc.Utf8))*/
      let encryptedPassword = decrypted.toString(CryptoJS.enc.Utf8)

      console.log("In here");


      if(encryptedPassword !== req.body.password + ''){
        console.log("password failed");
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      console.log(req.body.password);
      console.log(account.password);
      if(encryptedPassword === req.body.password + ''){
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

