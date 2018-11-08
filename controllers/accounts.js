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
      username: req.body.username,
      password: req.body.password
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


