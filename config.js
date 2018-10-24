// This file holds any configuration variables we need
// MLAB LOGIN = Username: CEN3031_Group5 , Password: CEN3031
// MLAB USER = Username: root, Password: password1

module.exports = {
  db: {
    uri: 'mongodb://root:password1@ds113122.mlab.com:13122/accounts',
  },
  port: 8080,
  secret: 'password'
};

