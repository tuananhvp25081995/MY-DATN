var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  email: String,
  password:String,
  name: String,
  avatar: String,
  phone: String,
  created_at: { type: Date, default: Date.now },
},{
  versionKey:false
});

var User = mongoose.model('User', userSchema , 'users');

module.exports = User;