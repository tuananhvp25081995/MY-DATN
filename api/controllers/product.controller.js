var Product = require('../../models/product.model');

module.exports.product = async function(req,res){
  var products = await Product.find();
  res.json(products);

};
