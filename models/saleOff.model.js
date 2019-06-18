var mongoose = require('mongoose')

var saleOffSchema = new mongoose.Schema({
  message:String,
  name:[String],
  nameUser: String,
  tonggia: Number,
  status: Number | 0,
  phone: String,
  diachi: String,
  soluong:[Number],
  idSP:[String],
  price:[String],
  status: { type: Number, default: 0 }
});

var Saleoff = mongoose.model('Saleoff', saleOffSchema , 'saleoff');

module.exports = Saleoff;