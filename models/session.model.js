var mongoose = require('mongoose')

var sessionSchema = new mongoose.Schema({
  cart: String,
  id: String
});

var Sessions = mongoose.model('Session', sessionSchema , 'sessions');

module.exports = Sessions;