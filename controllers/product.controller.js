var Product = require('../models/product.model');
var db = require('../db');
module.exports.product = async function(req,res){
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;
  var start =  (page - 1)  * perPage;
  var end = page * perPage;
  var sessionId = req.signedCookies.sessionId;
  var userId = req.signedCookies.userId
  if(db.get('sessions').find({ id: sessionId }).value() === undefined){
    var products = await Product.find();
    res.render('products/index',{
      products: products.slice(start, end)
    });
  }
  if(db.get('sessions').find({ id: sessionId }).value().cart === undefined){
    var products = await Product.find();
    res.render('products/index',{
      products: products.slice(start, end)
    });
  }
  var total = db.get('sessions').find({ id: sessionId }).value().cart;
  var count = sumSalaries(total);

  var products = await Product.find();
    res.render('products/index',{
      products: products.slice(start, end),
      count: count,
      userId: userId
    });
  };

module.exports.search = async function(req,res){
  var q = req.query.q;
  var product = await Product.find();
  var searchname = product.filter(function(product){
      return product.name.toLowerCase().indexOf(q) !== -1;
  });
  res.render('products/index',{
      products:searchname
  });
}

function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }
  return sum;
}

module.exports.viewCart = async function(req, res){
  var sessionId = req.signedCookies.sessionId;
  var total = db.get('sessions').find({ id: sessionId }).value().cart;
  var count = sumSalaries(total);
  var products = await Product.find();
    res.render('products/cart',{
      count: count
    });
}
