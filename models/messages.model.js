var mongoose = require('mongoose')

var messageSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  email: String,
  message:String,
  comments_at: { type: Date, default: Date.now },
});

var Message = mongoose.model('Message', messageSchema , 'messages');

module.exports = Message;