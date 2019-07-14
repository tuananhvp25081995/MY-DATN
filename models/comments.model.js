var mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
  message:String,
  userId : String,
  comments_at: { type: Date, default: Date.now },
});

var Comment = mongoose.model('Comment', commentSchema , 'comments');

module.exports = Comment;