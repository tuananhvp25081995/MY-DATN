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
  next();
} 