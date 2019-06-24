var mongoose = require('mongoose')

var saleOffSchema = new mongoose.Schema({
  description:String,
  sale:Number,
  status: { type: Number, default: 0 },
  makm: Number,
  startday: { type: Date },
  endday : { type: Date },
});

var Saleoff = mongoose.model('Saleoff', saleOffSchema , 'saleoff');

module.exports = Saleoff;