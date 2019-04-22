var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
  description:String,
  name: String,
  image: String
});

var User = mongoose.model('User', productSchema , 'products');

module.exports = User;