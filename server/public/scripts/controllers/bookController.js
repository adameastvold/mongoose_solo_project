app.controller('bookController', ['$scope', '$http', function ($scope, $http){
  $scope.books = []; // the array of books we expect
  $scope.newBook = {}; // this is going to be the model for our form (represents all the new data for our object) single book to be added to db
  $scope.displayBookId = '';
  $scope.newComment = {};

  getBooks();

//SCOPED FUNCTIONS://
$scope.submitNewBook = function(){
  var data = $scope.newBook;
  $http.post('/books', data)
    .then(function () {
      console.log('POST /books', data);
      getBooks();
    });
};

$scope.deleteBook = function(id){
  $http.delete('/books/' + id)
    .then(function(){
      console.log('DELETE /books/', id);
      getBooks();
    });
};

$scope.updateBook = function(book){
  var id = book._id; //when you use mongo it auto makes an _id

  $http.put('/books/' + id, book)
    .then(function(){
      console.log('PUT /books', id);
      getBooks();
    });
};

//sort book
$scope.propertyName = 'title';
$scope.reverse = true;

$scope.sortBy = function(propertyName) {
  $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
  $scope.propertyName = propertyName;
};

$scope.displayComments = function(id){
  $scope.displayBookId = id;
};

$scope.submitComment = function(id){
  var data = $scope.newComment;
  $http.post('/books/' + id + '/comments', data)
    .then(function(){
      console.log('POST /books/', id, '/comments', data);

      getBooks();
      $scope.newComment = {};
    });
};




//delete comments
$scope.deleteComment = function(id){
  $http.delete('/books/' + id + '/comments')
    .then(function(){
      console.log('comment DELETE /books/', id, '/comments');
      getBooks();
    });
};


//UTILITY FUNCTIONS://
function getBooks(){
  $http.get('/books')
    .then(function(response) {
      console.log('GET /books', response.data);

      var bookDataArray = response.data;

      bookDataArray.forEach(function(book){
        book.publishDate = new Date(book.publishDate);
      });

      $scope.books = bookDataArray;
    });
};


}]);
