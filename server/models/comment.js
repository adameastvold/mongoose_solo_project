var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// This is called a SUBDOCUMENT
var commentSchema = new Schema({
  content: { type: String, require: true },
  postedBy: { type: String, require: true }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
