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
    Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count((err, counts) => {
        if (err) return next(err);
        res.render('products/index', {
          products,
          current: page,
          pages: Math.ceil(counts / perPage),
          count:count,
          userId: userId
        });
      });
    });
  }
  if(db.get('sessions').find({ id: sessionId }).value().cart === undefined){
    Product
  .find({})
  .skip((perPage * page) - perPage)
  .limit(perPage)
  .exec((err, products) => {
    Product.count((err, counts) => {
      if (err) return next(err);
      res.render('products/index', {
        products,
        current: page,
        pages: Math.ceil(counts / perPage),
        count:count,
        userId: userId
      });
    });
  });
  }
  var total = db.get('sessions').find({ id: sessionId }).value().cart;
  var count = sumSalaries(total);
  Product
  .find({})
  .skip((perPage * page) - perPage)
  .limit(perPage)
  .exec((err, products) => {
    Product.count((err, counts) => {
      if (err) return next(err);
      res.render('products/index', {
        products,
        current: page,
        pages: Math.ceil(counts / perPage),
        count:count,
        userId: userId
      });
    });
  });
};

module.exports.search = async function(req,res){
  var userId = req.signedCookies.userId
  var q = req.query.q;
  var product = await Product.find();
  var searchname = product.filter(function(product){
      return product.name.toLowerCase().indexOf(q) !== -1;
  });
  res.render('products/index',{
      products:searchname,
      userId: userId
  });
}

module.exports.viewCart = function(req, res){
  var sessionId = req.signedCookies.sessionId;
  var tong = 0;
  var total = db.get('sessions').find({ id: sessionId }).value().cart;
  var totals = Object.keys(total);
  var count = sumSalaries(total);
    Product.find({_id:totals})
    .then(function(product){
      for(var i = 0 ; i < product.length; i++){
        var x = product[i].price * total[product[i].id]
        tong += x
      }
      var tongPrice = tong 
      res.render('products/cart',{
        count: count,
        tongPrice:tongPrice,
        products: product,
        amounts: total
      });
  });

}

module.exports.count = async function(req, res, next){
  var sessionId = req.signedCookies.sessionId;
  if(db.get('sessions').find({ id: sessionId }).value() === undefined){
    next()
  }
  if(db.get('sessions').find({ id: sessionId }).value().cart === undefined){
   next();
  }
  var total = db.get('sessions').find({ id: sessionId }).value().cart;
  var count = sumSalaries(total); 
  res.locals.count = count
  next()
};

module.exports.viewProduct = function(req, res){
  res.render('products/gioithieusanpham')
};

module.exports.shareInfomation = function(req, res){
  res.render('products/chiasenguoibenh',{
    current: 2,
    pages: 3
  }); 
};

module.exports.contact = function(req, res){
  res.render('products/lienhe')
};

module.exports.camNang1 = function(req, res){
  res.render('products/tinsuckhoe')
};

module.exports.camNang2 = function(req, res){
  res.render('products/chiasenguoibenh')
};

module.exports.camNang3 = function(req, res){
  res.render('products/tinsuckhoe')
};

module.exports.camNang4 = function(req, res){
  res.render('products/chiasenguoibenh')
};

module.exports.camNang5 = function(req, res){
  res.render('products/tinsuckhoe')
};

module.exports.thanhToan = function(req, res){
  res.render('products/thanhtoan')
}

function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }
  return sum;
}
