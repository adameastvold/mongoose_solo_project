var express = require('express');
var router = express.Router();
var Book = require('../models/book'); //require the path to the model you've created

/**
 * GET /movies
 *
 * return all movies from database
 */
router.get('/', function (req, res) {
  Book.find({}, function(err, books) { //the empty object will grab everything
      if (err) {
        res.sendStatus(500);
        return;
      }

      res.send(books);
  });
});


/**
 * POST /movies
 *
 * add a new movie to the database
 */
router.post('/', function (req, res) {
  console.log('POST:', req.body);
  var book = Book(req.body); //created a book object that conforms to our book document that was formed in our model
  book.save(function (err) { //save is a function on the document
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(201); //CREATED
  });
});


/**
 * PUT /movies/<id>
 *
 * update a movie with the given id
 */
router.put('/:id', function (req, res) {
  var book = req.body;
  var id = req.params.id;
  Book.findByIdAndUpdate(id, book, function(err, book) {
    if (err){
      res.sendStatus(500);
      return;
    }

    res.status(204).send(book); //sends a success status and the book information
  });
});



/**
 * DELETE /movies/<id>
 *
 * delete a movie with the given id
 */
router.delete('/:id', function (req, res) {
  var id = req.params.id;
  Book.findByIdAndRemove(id, function(err){
    if(err){
      res.sendStatus(500);
      return;
      }

      res.sendStatus(204);
  });
});


//COMMENTS ROUTE//
router.post('/:id/comments', function(req, res){
  var id = req.params.id;
  var comment = req.body;

  Book.findById(id, function(err, book){
    if (err){
      res.sendStatus(500);
      return;
    }

    book.comments.push(comment);
    book.save(function(err) {
      if (err){
        res.sendStatus(500);
        return;
      }

      res.sendStatus(204);
    });
  });
});

// router.delete('/:id/comments', function (req, res) {
//   var id = req.params.id;
//   Book.findById(id, function(err){
//     if(err){
//       res.sendStatus(500);
//       return;
//       }
//
//       res.sendStatus(204);
//       });
//   });
// });

module.exports = router;
