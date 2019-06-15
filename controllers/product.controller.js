var Product = require('../models/product.model');
var Hoadon = require('../models/hoadon.model');
var db = require('../db');
var url = require('url');
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
  var userId = req.signedCookies.userId
  res.locals.count = count
  res.locals.userId = userId
  next()
};

module.exports.viewProduct = function(req, res){
  res.render('products/gioithieusanpham')
};

module.exports.postViewCart = function(req, res){
  var products = [];
  var product = {};
  var hoadon = new Hoadon (req.body);
  var nameHoaDon = hoadon.name;
  var idSP = hoadon.idSP;
  var soLuongSP = hoadon.soluong;
  // console.log(hoadon)
  // for(var i = 0; i < nameHoaDon.length ; i++){
  //   // var x = nameHoaDon[i];
  //   // var y = idSP[i];
  //   // var z = soLuongSP[i];

  //   product.name = nameHoaDon[i];
  //   product.id = idSP[i];
  //   product.soluong = soLuongSP[i];

  //   console.log(product)
    
  // }
    // res.redirect('/products')
    
  // console.log(nameHoaDon, idSP, soLuongSP);
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

// module.exports.thanhToan = function(req, res){
//   res.render('products/thanhtoan');
// }

// module.exports.thanhToanHoaDon = function(req, res){
//   var hoadons = new Hoadon (req.body);
//   console.log(hoadon)
// //   hoadon.save((err,data) =>{
// //     if(err){
// //         res.send(err);
// //     }
// //     res.end(data);
// // });
// res.redirect('/products')
// }

module.exports.chitiet =async function(req, res){
  var x = url.parse(req.url).path.split('/')
  var pathname = x[2];
  var products = await Product.find({ _id:  pathname});
  var product =products[0];
  res.render('products/chitiet',{
    pathname:pathname,
    product: product
  })
}

function sumSalaries(salaries) {

  let sum = 0;
  for (let salary of Object.values(salaries)) {
    sum += salary;
  }
  return sum;
}
