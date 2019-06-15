var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
  description:String,
  name: String,
  image: String,
  price: Number,
  updated: { type: Date, default: Date.now },
});

var Product = mongoose.model('Product', productSchema , 'products');

module.exports = Product;