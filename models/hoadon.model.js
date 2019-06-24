var mongoose = require('mongoose')

var hoadonSchema = new mongoose.Schema({
  message:String,
  name:[String],
  nameUser: String,
  tonggia: Number,
  status: Number | 0,
  phone: String,
  diachi: String,
  idSP : [String],
  soluong:[Number],
  price:[String],
  created_at: { type: Date, default: Date.now },
  status: { type: Number, default: 0 }
});

var Hoadon = mongoose.model('Hoadon', hoadonSchema , 'hoadon');

module.exports = Hoadon;