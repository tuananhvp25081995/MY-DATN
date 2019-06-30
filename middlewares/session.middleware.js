var moment = require('moment');
moment().format();
var shortid = require('shortid');
var User = require('../models/user.model');
var Admin = require('../models/admin.model');
var Product = require('../models/product.model');
var Hoadon = require('../models/hoadon.model');
var Saleoff = require('../models/saleoff.model');
var Message = require('../models/messages.model');

var db = require('../db');

module.exports =async function (req, res, next) {
  if (!req.signedCookies.sessionId) {
    var sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    db.get('sessions').push({
      id: sessionId
    }).write();
  }
  var dateNow = new Date().getTime();
  var saleoffs = await Saleoff.find({});
  var startSales = saleoffs[0].startday
  var status = saleoffs[0].status
  var sales1 = saleoffs[0].sale
  var sales2 = saleoffs[1].sale
  var sales3 = saleoffs[2].sale
  var sales4 = saleoffs[3].sale
  res.locals.sales1 = sales1;
  res.locals.sales2 = sales2;
  res.locals.sales3 = sales3;
  res.locals.sales4 = sales4;
  var endSales = saleoffs[0].endday
  var dateSale = endSale - startSale;
  var endSale = new Date(endSales).getTime();
  var startSale = new Date(startSales).getTime()
  res.locals.dateNow = dateNow;
  res.locals.startSale = startSale;

  res.locals.status = status;
  res.locals.endSale = endSale;
  res.locals.dateSale = dateSale;
  var user = await User.find({_id: req.signedCookies.userId});
  res.locals.user = user[0];
  var admin = await Admin.find({_id: req.signedCookies.adminId});
  res.locals.admin = admin[0];
  var countProduct = await Product.count();
  res.locals.totalProduct = countProduct

  var hoadons = await Hoadon.count({status: 0});
  res.locals.hoadon = hoadons
  var messages = await Message.find({});
  var numMessages = messages.length;
  res.locals.numMessages = numMessages;
  var messages = await Message.find({});

  var hoadons = await Hoadon.find({ $and:[{"status": 1},{userid:user[0].id}]});
  var arrayHoadon = [];
  var arrayHoadons = [];
  var giaHoadons = [];
  var ngaymuaHoadons = [];
  hoadons.forEach( hoadon => {
    var x = Array.from(hoadon.idSP)
    var y = Array.from(hoadon.soluong)
    var z = Array.from(hoadon.price)
    var t = hoadon.created_at
    arrayHoadon.push(x.toString());
    arrayHoadons.push(y.toString());
    giaHoadons.push(z.toString());
    ngaymuaHoadons.push(t.toString());
  })
  var idHoaDon = arrayHoadon.toString();
  var soluongHoaDon = arrayHoadons.toString();
  var giaHoadon = giaHoadons.toString();
  var idHoaDons = (idHoaDon.split(","));
  var soluongHoaDons = (soluongHoaDon.split(","));
  var priceHoaDons = (giaHoadon.split(","));
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
  res.locals.tongPrices = tongPrice
  console.log(tongPrice)
  next();
} 