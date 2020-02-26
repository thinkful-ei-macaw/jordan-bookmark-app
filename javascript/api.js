// Base URL for API Endpoint 

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jordan/bookmarks';

function mainAPIFunction (...params) {
  let error;
  return fetch(...params)
    .then(res => {
      if(!res.ok) error = { code: res.status };
      if(!res.headers.get('content-type').includes('json')) {
        error.message = res.statusText;
        return Promise.reject(error);
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}

// Function responsible for fetching items

function getBookmarkItems() {
  return mainAPIFunction(BASE_URL);
}

// Fetching responsible for adding items
function addBookMark(newItem) {
  return mainAPIFunction(BASE_URL, {
    method: 'POST', 
    headers: {'Content-Type':'application/json'},
    body: newItem
  });
}

// Function responsible for deleting items

function deleteBookmarkItems(id) {
  return mainAPIFunction(BASE_URL + '/' + id, {
    method: 'DELETE'
  });
}

// Fetching responsible for updating items 

function editBookMarkItems(id, data) {
  return mainAPIFunction(BASE_URL + '/' + id, {
    method: 'PATCH', 
    headers: {'Content-Type':'application/json'},
    body: data
  });
}

export default {
  getBookmarkItems,
  addBookMark,
  deleteBookmarkItems,
  editBookMarkItems
};