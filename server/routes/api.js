const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Accounts   = require('../../model/accounts'); // get our mongoose model
const app = require('../../server');

// Get users diplays all the users if you hit the api/users endpoint
router.get('/users', (req, res) => {
  Accounts.find({}, function(err, accounts) {
  res.json(accounts);
  JSON.parse(JSON.stringify(accounts));
});
});

//This is the Login API that checks credentials and creates a session token
//The token is stored in local memory on the client computer and can be checked any time.
router.post('/login', (req, res, next) => {
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


      // if user is found and password is right
      // create a token with only our given payload
      // we don't want to pass in the entire user since that has the password
      const payload = {
        email: account.email
      };

      //Todo add payload to the token to use for getting user profile later
      //Todo Will want to attach a user to the token so only the user attached to the token
      //Todo can access their profile
      var token = jwt.sign(payload, app.get('superSecret'), {
        expiresIn: '180m' // expires in 3hours
      });

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
});

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


module.exports = router;
