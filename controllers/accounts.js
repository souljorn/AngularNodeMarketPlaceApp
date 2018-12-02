const Accounts   = require('../model/accounts'); // get our mongoose model

//displays all the users if you hit the api/users endpoint
exports.allUsers =  (req, res) => {
  Accounts.find({}, function (err, accounts) {
    res.status(200).json(accounts);
    JSON.parse(JSON.stringify(accounts));
    console.log("Users api hit");
    console.log(JSON.parse(JSON.stringify(accounts)));
  });
};

//********Create new user*******
exports.createAccount = (req, res) => {
  let data = new Accounts(
    {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      image: req.body.image,
      salt: req.body.salt
    }
  );

  Accounts.create(data).then(user => {
    if (user)
      res.status(200).json(user);
  })
    .catch(err => {
      res.status(500).send(err);
    });
};

exports.getUser = (req, res) => {
  const requestedUser = req.params['email'];

  Accounts.findOne({email: requestedUser})
    .exec()
    .then(user => {
      //if the user doesn't exits fail
      if(!user){
        console.log("user does not exist");
        return res.status(401).json({
          message: 'user does not exist'
        });
      }
      else{
        return res.status(200).json(user);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'user does not exits'
      });
    });
}

exports.updateUser = (req,res) => {
  console.log("updateUser in server");
  let requestedUser = req.params['email'];
  console.log(requestedUser);
  console.log(req.body);

  let data = new Accounts(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      image: req.body.image,
      salt: req.body.salt
    });
  console.log("Thos is the object getting sent to mongo");
  console.log(data);

  Accounts.findOneAndUpdate({email: requestedUser},
    {firstname:data.firstname, lastname:data.lastname, image: data.image},{new:true}
    , (err, doc) => {
      if (err) return res.send(500, { error: err });
      return res.status(311).json(doc);
    })
  }


exports.deleteUser = (req,res) => {
  console.log("attempting to delete user");

  console.log(req.body.email);

  Accounts.findOneAndDelete( {email: req.body.email}, function(err, doc) {

    //Return a document of user
    if (!err) {
      console.log( 'notification!');
      return res.status(311).json(doc);
    }

    //If error don't delete
    else {
      console.log( 'error!' + err);
      return res.send(500, { error: err });
    }
  });
}
