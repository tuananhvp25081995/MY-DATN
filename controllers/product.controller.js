var Product = require('../models/product.model');
var Hoadon = require('../models/hoadon.model');
var Comment = require('../models/comments.model');
var Message = require('../models/messages.model');
var calculatePrice = require('./priceproduct');
var db = require('../db');
var url = require('url');
module.exports.product = async function(req,res){
  var page = parseInt(req.query.page) || 1;
  var perPage = 8;
  var sessionId = req.signedCookies.sessionId;
  var userId = req.signedCookies.userId
  if(db.get('sessions').find({ id: sessionId }).value() === undefined){
    Product
    .find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count((err, counts) => {
        let pageInfo = {};
        pageInfo.calculatePrice = calculatePrice;
        if (err) return next(err);
        res.render('products/index', {
          products,
          current: page,
          pages: Math.ceil(counts / perPage),
          count:count,
          userId: userId,
          pageInfo,
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
      let pageInfo = {};
      pageInfo.calculatePrice = calculatePrice;
      if (err) return next(err);
      res.render('products/index', {
        products,
        current: page,
        pages: Math.ceil(counts / perPage),
        count:count,
        userId: userId,
        pageInfo,
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
      let pageInfo = {};
      pageInfo.calculatePrice = calculatePrice;
      if (err) return next(err);
      res.render('products/index', {
        products,
        pageInfo,
        current: page,
        pages: Math.ceil(counts / perPage),
        count:count,
        userId: userId,
      });
    });
  });
};

module.exports.search = async function(req,res){
  var userId = req.signedCookies.userId
  var q = req.query.q;
  var product = await Product.find();
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  var searchname = product.filter(function(product){
      return product.name.toLowerCase().indexOf(q) !== -1;
  });
  res.render('products/index',{
      products:searchname,
      userId: userId,
      pageInfo,
  });
}

module.exports.viewCart = function(req, res){
  var sessionId = req.signedCookies.sessionId;
  var tong = 0;
  var total = db.get('sessions').find({ id: sessionId }).value().cart;
  var totals = Object.keys(total);
  var count = sumSalaries(total);
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
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
        amounts: total,
        pageInfo,
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
  var userId = req.signedCookies.userId
  res.locals.count = count
  res.locals.userId = userId
  next()
};

module.exports.viewProduct = function(req, res){
  res.render('products/gioithieusanpham')
};

module.exports.postViewCart = function(req, res){
  var hoadon = new Hoadon (req.body);
  hoadon.save((err,data) =>{
    if(err){
        res.send(err);
    }
    res.end(data);
  });
  res.redirect('/products')
}

module.exports.shareInfomation = function(req, res){
  res.render('products/chiasenguoibenh',{
    current: 2,
    pages: 3
  }); 
};

module.exports.contact = function(req, res){
  res.render('products/lienhe')
};

module.exports.postContact =async function(req,res){
  var message = new Message (req.body);
  message.save((err,data) =>{
    if(err){
        res.send(err);
    }
    res.end(data);
  });
  res.redirect('/');
}

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

module.exports.chitiet =async function(req, res){
  var userId = req.signedCookies.userId
  var x = url.parse(req.url).path.split('/')
  var pathname = x[2];
  var products = await Product.find({ _id:  pathname});
  var comments = await Comment.find({});
  var product =products[0];
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  res.render('products/chitiet',{
    pathname:pathname,
    product: product,
    pageInfo,
    comments,
  })
}

module.exports.comments = async function(req, res){
  var id = req.params.id
  var comment = new Comment (req.body);
  comment.save((err,data) =>{
    if(err){
        res.send(err);
    }
    res.end(data);
  });
  res.redirect('/chi-tiet/'+id)
}

module.exports.giamGia = async function(req, res){
  var products = await Product.find();
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  res.render('products/index',{
    products,
    pageInfo
  });
}

module.exports.sanPhamMoi = async function(req, res){
  var userId = req.signedCookies.userId
  var products = await Product.find();
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  var searchname = products.filter(function(product){
    return product.category == "New";
  });
  res.render('products/index',{
    products:searchname,
    userId: userId,
    pageInfo,
  });
}

module.exports.comBo = async function(req, res){
  var userId = req.signedCookies.userId
  var products = await Product.find();
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  var searchname = products.filter(function(product){
    return product.category == "Combo";
  });
  res.render('products/index',{
    products:searchname,
    userId: userId,
    pageInfo,
  });
}

module.exports.sanPhamBanChay = async function(req, res){
  var userId = req.signedCookies.userId
  var products = await Product.find();
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  var searchname = products.filter(function(product){
    return product.category == "Bán chạy nhất";
  });
  res.render('products/index',{
    products:searchname,
    userId: userId,
    pageInfo,
  });
}

function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }
  return sum;
}
