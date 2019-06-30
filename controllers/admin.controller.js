var Product = require('../models/product.model');
var Hoadon = require('../models/hoadon.model');
var User = require('../models/user.model');
var Admin = require('../models/admin.model');
var Message = require('../models/messages.model');
var Saleoff = require('../models/saleoff.model');
var calculatePrice = require('./priceproduct');
var md5 = require('md5');

module.exports.index = async function(req, res){
  Product
    .find({})
    .exec((err, products) => {
      Product.count((err, counts) => {
        let pageInfo = {};
        pageInfo.calculatePrice = calculatePrice;
        if (err) return next(err);
        res.render('admin/index', {
          products,
          totalProduct: counts,
          pageInfo
        });
      });
    });
};

module.exports.blank = function(req, res){
  res.render('admin/blank');
};

module.exports.charts = async function(req, res){
  var hoadons = await Hoadon.find({"status": 1});
  var arrayHoadon = [];
  var arrayHoadons = [];
  var giaHoadons = [];
  var ngaymuaHoadons = [];
  var imageHoaDonss = [];
  hoadons.forEach( hoadon => {
    var x = Array.from(hoadon.idSP)
    var y = Array.from(hoadon.soluong)
    var z = Array.from(hoadon.price)
    var t = hoadon.created_at
    var r = Array.from(hoadon.image)
    arrayHoadon.push(x.toString());
    arrayHoadons.push(y.toString());
    giaHoadons.push(z.toString());
    ngaymuaHoadons.push(t.toString());
    imageHoaDonss.push(r.toString());
  })
  var idHoaDon = arrayHoadon.toString();
  var soluongHoaDon = arrayHoadons.toString();
  var giaHoadon = giaHoadons.toString();
  var anhHoaDon = imageHoaDonss.toString();
  var idHoaDons = (idHoaDon.split(","));
  var soluongHoaDons = (soluongHoaDon.split(","));
  var priceHoaDons = (giaHoadon.split(","));
  var imageHoaDons = (anhHoaDon.split(","));
  for(var i = 0; i < idHoaDons.length -1; i++){
    for(var j = i + 1; j < idHoaDons.length; j++){
      if(idHoaDons[i] === idHoaDons[j]){
        for (k = j; k < idHoaDons.length; k++){
          idHoaDons[k] = idHoaDons[k+1];
          priceHoaDons[k] = priceHoaDons[k+1];
          imageHoaDons[k] = imageHoaDons[k+1];
          if(k===j){
            soluongHoaDons[i] = parseInt(soluongHoaDons[i]) + parseInt(soluongHoaDons[j]);
          }
          soluongHoaDons[k] = soluongHoaDons[k+1]
				}
        idHoaDons.length--;
        imageHoaDons.length--;
        soluongHoaDons.length--;
        i--;
      }
    }
  }
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  if(hoadons[0] === undefined){
    res.render('admin/hoadonblank')
  }
  res.render('admin/charts',{
    hoadons : hoadons,
    idHoaDons:idHoaDons,
    soluongHoaDons:soluongHoaDons,
    priceHoaDons,
    pageInfo,
    ngaymuaHoadons:ngaymuaHoadons,
    imageHoaDons:imageHoaDons,
  });
};

module.exports.forgotPassword = function(req, res){
  res.render('admin/forgot-password');
};

module.exports.register = function(req, res){
  res.render('admin/register');
};

module.exports.createPost =  function(req,res){
  req.body.avatar = req.file.path.split('/').slice(1).join('/');
  req.body.password = md5(req.body.password);
  let admins =  new Admin (req.body)
  var errors = [];
  if(!req.body.name){
      errors.push('Name is required')
  }
  if(!req.body.email){
      errors.push('email is required')
  }

  if(errors.length){
      res.render('admin/register',{
          errors: errors,
          values: req.body
      });
      return;
  }
  admins.save((err,data) =>{
      if(err){
          res.send(err);
      }
      res.end(data);
  });
  res.redirect('/admin/login')
}

module.exports.tables = function(req, res){
  Product.find().then(function(products){
    let pageInfo = {};
    pageInfo.calculatePrice = calculatePrice;
    res.render('admin/tables',{
      products: products,
      pageInfo
    });
  });
};

module.exports.create = async function(req, res){
  res.render('admin/createproduct');
}

module.exports.createProduct = async function(req, res){
  req.body.image = req.file.path.split('/').slice(1).join('/');
  let product =  new Product (req.body)
  var errors = [];
  if(!req.body.name){
      errors.push('Name is required')
  }
  if(!req.body.description){
      errors.push('Description is required')
  }
  if(!req.body.price){
    errors.push('Price is required')
  }

  if(errors.length){
      res.render('admin/product/create',{
          errors: errors,
          values: req.body
      });
      return;
  }
  product.save((err,data) =>{
      if(err){
          res.send(err);
      }
      res.end(data);
  });
  res.redirect('/admin/products')
}

module.exports.editProduct = async function(req, res){
  var productId = req.params.productId
  let product =  await Product.findById({_id:productId})
  res.render('admin/editproduct',{
    product,
  });
}

module.exports.editProducts = async function(req, res){
  req.body.image = req.file.path.split('/').slice(1).join('/');
  var productId = req.params.productId
  Product.update({_id:productId},{
    name: req.body.name,
    description:req.body.description,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity,
    image: req.body.image,
    updated_at : Date.now()
  }, function (err, docs) {
      if(err){
        console.log(err);
      }
    });
  res.redirect('/admin/products');
}

module.exports.deleteProduct = async function(req, res){
  var productId = req.params.productId
  Product.deleteOne({ _id: productId }, function (err) {
    if (err) return handleError(err);
  });
  res.redirect('/admin/products');
}

module.exports.hoadon = async function(req, res){
  var hoadons = await Hoadon.find({"status": 0});
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  if(hoadons[0] === undefined){
    res.render('admin/hoadonblank')
  }
  var status = hoadons[0].status
  res.render('admin/hoadon',{
    hoadons : hoadons,
    status: status,
    pageInfo,
  });
}

module.exports.paidBill = async function(req, res){
  var hoadonId = req.params.hoadonId;
  var products = await Product.find({});
  var paidBills = await Hoadon.find({_id: hoadonId});
  var idSP = paidBills[0].idSP;
  var soluong = paidBills[0].soluong;
  for(var i = 0; i < idSP.length; i++){
    var products = await Product.find({_id:idSP[i]});
    var quantity = products[0].quantity
    var quantitys = soluong[i]
    if(quantity - quantitys >= 0){
      Product.findOneAndUpdate({_id:idSP[i]}, {$set:{quantity:quantity-quantitys}}, {new: true}, (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
      });
    }
    else{
      console.log("het hang")
    }
  }

  Hoadon.findOneAndUpdate({_id: hoadonId}, {$set:{status:1}}, {new: true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }
  });
  res.redirect('/admin/hoa-don')
}

module.exports.paidBills = async function(req, res){
  var hoadons = await Hoadon.find({"status": 1});
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  var status = hoadons[0].status
  res.render('admin/paidbill',{
    hoadons : hoadons,
    status: status,
    pageInfo,
  });
}

module.exports.saleOff = async function(req, res){
  var dateNow = Date.now()
  var saleoffs = await Saleoff.find({});
  var startSale = saleoffs[0].startday
  var endSale = saleoffs[0].endday
  res.render('admin/saleoff',{
    saleoffs,
  })
}

module.exports.viewSaleOff = async function(req, res){
  res.render('admin/createsale');
}

module.exports.createSaleOff = async function(req, res){
  let sale =  new Saleoff (req.body)
  var errors = [];
  if(!req.body.description){
      errors.push('Description is required')
  }
  if(!req.body.sale){
      errors.push('Sale is required')
  }
  if(!req.body.startday){
    errors.push('StartDay is required')
  }
  if(!req.body.endday){
    errors.push('EndDay is required')
  }

  if(errors.length){
      res.render('admin/sale/create',{
          errors: errors,
          values: req.body
      });
      return;
  }
  sale.save((err,data) =>{
      if(err){
          res.send(err);
      }
      res.end(data);
  });
  res.redirect('/admin/sale')
}

module.exports.editSale = async function(req, res){
  var saleId = req.params.saleId
  let sale =  await Saleoff.findById({_id:saleId})
  res.render('admin/editsale',{
    sale,
  });
}

module.exports.editSales = async function(req, res){
  var saleId = req.params.saleId
  Saleoff.update({_id:saleId},{
    description:req.body.description,
    sale: req.body.sale,
    startday: req.body.startday,
    endday: req.body.endday,
  }, function (err, docs) {
      if(err){
        console.log(err);
      }
    });
  res.redirect('/admin/sale');
}

module.exports.updateSale = async function(req, res){
  var saleId = req.params.saleId;
  var sale = await Saleoff.findById({_id:saleId});
  var num = sale.status
  if(num === 0){
    Saleoff.findOneAndUpdate({_id: saleId}, {$set:{status:1}}, {new: true}, (err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
    });
  }
  if(num === 1){
    Saleoff.findOneAndUpdate({_id: saleId}, {$set:{status:0}}, {new: true}, (err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
    });
  }
  res.redirect('/admin/sale')
}
//Admin
module.exports.login = async function(req, res){
  res.render('admin/login');
};

module.exports.logOut = function(req,res){
  res.clearCookie('adminId');
  res.redirect('/admin/login');
}

module.exports.postLogin = async function(req,res){
  var email = req.body.email;
  var admin = await Admin.find({email: email});
  var admins = admin[0]
  if(admins === undefined){
      res.render('admin/login',{
        errors:[
            'User does not exits'
        ],
        values: req.body
      });
      return;
  }
  var adminPassword = md5(req.body.password);
  if(admins.password !== adminPassword){
      res.render('admin/login',{
        errors:[
            'Wrong password'
        ],
        values: req.body
      });
      return;
  }
  res.cookie('adminId', admins._id,{
    signed: true
  });
  res.redirect('/admin');
};

module.exports.message = async function(req,res){
  var messages = await Message.find({});
  res.render('admin/message',{
    messages,
  });
}

module.exports.user = async function(req, res){
  var users = await User.find();
  res.render('admin/users',{
      users: users
  });
};

module.exports.get = async function(req,res){
  var id = req.params.id;
  var users = await User.find({_id:id});

  users.forEach(function(user){
      res.render('users/view',{
          user: user
      });
  });
}

module.exports.viewUser = async function(req, res){
  var id = req.params.id;
  var hoadons = await Hoadon.find({ $and:[{"status": 1},{userid:id}]});
  var arrayHoadon = [];
  var arrayHoadons = [];
  var giaHoadons = [];
  var ngaymuaHoadons = [];
  var imageHoaDonss = [];
  hoadons.forEach( hoadon => {
    var x = Array.from(hoadon.idSP)
    var y = Array.from(hoadon.soluong)
    var z = Array.from(hoadon.price)
    var t = hoadon.created_at
    var r = Array.from(hoadon.image)
    arrayHoadon.push(x.toString());
    arrayHoadons.push(y.toString());
    giaHoadons.push(z.toString());
    ngaymuaHoadons.push(t.toString());
    imageHoaDonss.push(r.toString());
  })
  var idHoaDon = arrayHoadon.toString();
  var soluongHoaDon = arrayHoadons.toString();
  var giaHoadon = giaHoadons.toString();
  var anhHoaDon = imageHoaDonss.toString();
  var idHoaDons = (idHoaDon.split(","));
  var soluongHoaDons = (soluongHoaDon.split(","));
  var priceHoaDons = (giaHoadon.split(","));
  var imageHoaDons = (anhHoaDon.split(","));
  var tong = 0;
  for(var i = 0; i < idHoaDons.length -1; i++){
    for(var j = i + 1; j < idHoaDons.length; j++){
      if(idHoaDons[i] === idHoaDons[j]){
        for (k = j; k < idHoaDons.length; k++){
          idHoaDons[k] = idHoaDons[k+1];
          priceHoaDons[k] = priceHoaDons[k+1];
          if(k===j){
            soluongHoaDons[i] = parseInt(soluongHoaDons[i]) + parseInt(soluongHoaDons[j]);
          }
          soluongHoaDons[k] = soluongHoaDons[k+1]
				}
        idHoaDons.length--;
        soluongHoaDons.length--;
        i--;
      }
    }
  }
  for(var y = 0 ; y < idHoaDons.length; y++){
    var u = priceHoaDons[y] * soluongHoaDons[y]
    tong += u
  }
  var tongPrice = tong
  let pageInfo = {};
  pageInfo.calculatePrice = calculatePrice;
  var users = await User.find({_id:id});
  users.forEach(function(user){
      res.render('admin/viewuser',{
        user: user,
        idHoaDons:idHoaDons,
        soluongHoaDons:soluongHoaDons,
        priceHoaDons,
        pageInfo,
        ngaymuaHoadons:ngaymuaHoadons,
        tongPrice,
        imageHoaDons:imageHoaDons,
      });
  });
}

module.exports.deleteUser = async function(req, res){
  var userId = req.params.userId
  User.deleteOne({ _id: userId }, function (err) {
    if (err) return handleError(err);
  });
  res.redirect('/admin/viewuser');
}
