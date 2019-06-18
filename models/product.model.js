var mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
  description:String,
  name: String,
  image: String,
  price: Number,
  quantity: Number,
  category: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date},
});

var Product = mongoose.model('Product', productSchema , 'products');

module.exports = Product;