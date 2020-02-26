import api from './api.js';
import store from './store.js';

function renderAddBookmark () {
  console.log('testing');
 $('.bookmark-container').html(`
    <header class="head-container">
        <h1 id="headline">My bookmarks</h1>
    </header>
    <form class="add-bookmark-form">
        <label for="title">Title</label><br>
        <input type="text" id="title" name="title"><br>
        <label for="desc">Description</label><br>
        <textarea id="desc" name="desc"></textarea>
        <label for ="rating">Rating</label>
        <input type="number" id="rating" name="rating" min="1" max="5">
        <label for="url">URL</label><br>
        <input type="url" id="url" name="url"> 
        <button class="add-new-bookmark-button">Submit</button> 
    </form>
    <button class="return" type="button">Cancel</button>
    `);
}






function deleteBookMark() {


}

function updateBookMark() {


}

function render() {
  if(store.adding) {
 renderAddBookmark()
  } else {
    generateFirstPage();    
  }
}

function generateFirstPage() {
  $('.bookmark-container').html(
    `<header class="head-container">
             <h1 id="headline">My bookmarks</h1>
         </header>
         <section class="button-section">
             <button class="add-bookmark">Add new bookmark</button>
                 <select name="ratings" id="filter-dropdown">
                     <option class="filter-top" name="select0" value="0">Filter by rating</option>
                     <option name="select1" value="5"> 5 or more</option>
                     <option name="select2" value="4"> 4 or more</option>
                     <option name="select3" value="3"> 3 or more</option>
                     <option name="select4" value="2"> 2 or more</option>
                     <option name="select5" value="1"> 1 or more</option>
                 </select>
         </section>
     </main>
`);
}




// Event Handlers 
	
function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

function handleBookMarkSubmission () {
$('main').on('submit', '.add-bookmark-form', function (event) {
event.preventDefault();
let form = $('.add-bookmark-form')[0];
let returnJson = serializeJson(form);

})
}

function returnToHomePage() {
  $('main').on('click', '.return', function (event) {
    store.adding = false;
    render();
  });
}

function goToNewBookmark() {
  console.log('createNewBookmark');
  $('main').on('click','.add-bookmark', function(event) {
    store.adding = true;
    render();
  });
}


function setEventHandlers () {
    goToNewBookmark();
    returnToHomePage();
    handleBookMarkSubmission();
}

// Listeners To do's
// filter select change 
// expand listener 
// delete button 

// call API, push to store, render the page, HTML templates





export default {
  render,
  setEventHandlers
};