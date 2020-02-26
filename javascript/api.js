// Base URL for API Endpoint 

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jordan/bookmarks';

// Function to GET bookmarks
function getBookMarks() {}

// Function to CREATE a new bookmark

function createNewBookmark() {
  $.ajax({
    type: 'POST',
    url: BASE_URL,
    data: JSON.stringify({
      'title': $('#title').val(),
      'desc': $('#desc').val(),
      'rating': $('#rating').val(),
      'url': $('#url').val()
    }),
    error: function (e) {
      console.log(e);
    },
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
  });
}

// Function to DELETE a new bookmark

function deleteBookMark() {

}

// Function to UPDATE a new bookmark 
function updateBookmark() {

}

export default {
  createNewBookmark,
  deleteBookMark,
  updateBookmark
};