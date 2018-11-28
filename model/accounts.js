// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('accounts', new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
  },
  lastname:{
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  items_purchased: Array,
  items_sold: Array,
  image: String
}));

