//creating new schema (book model for mongoose)

//Step 0 -Get our dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Comment = require('./comment').schema; //<-- little schema grabs the schema form that model file

//Step 1 - create the schema:
var bookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  publishDate: Date,
  publishedBy: String,
  comments: [Comment]
});

//Step 2 - create the model:
var Book = mongoose.model('Book', bookSchema);

//Step 3 - Export our model so we can use it in other parts of our app
module.exports = Book;
