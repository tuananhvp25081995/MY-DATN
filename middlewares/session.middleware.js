var shortid = require('shortid');
var User = require('../models/user.model');
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
  next();
} 