var shortid = require('shortid');
var User = require('../models/user.model');
var Admin = require('../models/admin.model');
var Product = require('../models/product.model');
var Hoadon = require('../models/hoadon.model');
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
  var user = await User.find({_id: req.signedCookies.userId});
  res.locals.user = user[0];
  var admin = await Admin.find({_id: req.signedCookies.adminId});
  res.locals.admin = admin[0];
  var countProduct = await Product.count();
  res.locals.totalProduct = countProduct
  var hoadons = await Hoadon.count({status: 0});
  res.locals.hoadon = hoadons
  next();
} 