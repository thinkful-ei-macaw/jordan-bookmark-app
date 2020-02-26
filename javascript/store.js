// Manages UI store (things that rep visually on our page)
const bookMarksList = [];
let filterValue = 0;
let initLoad = true;
let error = null;
let adding = false;

function findID(id) {
  return this.bookMarksList.find(currentBookMark => currentBookMark.id === id);
}

function addBookMark(bookmark) {
  bookmark.expanded = false;
  this.bookMarksList.push(bookmark);
}

function deleteBookMark() {
  return this.bookMarksList.filter(currentBookMark => currentBookMark.id !== id);
}

function updateBookmark (id, newObj) {
  let updatedItem = this.bookMarksList.find(currentBookMark => currentBookMark.id === id);
  Object.assign(updatedItem, newObj);

}

function setError (error) {
  this.error = error;

}

export default {
  findID, 
  addBookMark, 
  deleteBookMark, 
  updateBookmark,
  bookMarksList,
  initLoad,
  filterValue,
  error,
  adding
};


