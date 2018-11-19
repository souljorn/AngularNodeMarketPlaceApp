// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('items', new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  seller: {
    type: String,
    required: true
  },
  category:{
    type: String,
    default: 'miscellaneous'
  },
  image: String,
  address: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  country: String
}));
