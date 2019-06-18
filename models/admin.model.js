var mongoose = require('mongoose')

var adminSchema = new mongoose.Schema({
  email: String,
  password:String,
  name: String,
  avatar: String,
  created_at: { type: Date, default: Date.now },
},{
  versionKey:false
});

var Admin = mongoose.model('Admin', adminSchema , 'admins');

module.exports = Admin;