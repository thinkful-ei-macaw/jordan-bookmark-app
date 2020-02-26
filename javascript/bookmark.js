import api from './api.js';
import store from './store.js';

// Template Generators 

function renderAddBookmark() {
  return `
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
    `;
}

function generateFirstPage() {
  return `
    <header class="head-container">
             <h1 id="headline">My bookmarks</h1>
         </header>
         <section class="button-section">
             <button class="add-bookmark">Add new bookmark</button>
                 <select name="ratings" id="filter-dropdown">
                     <option class="filter-top" name="select0" value="0">Filter by rating</option>
                     <option name="select1" value="5"> 5</option>
                     <option name="select2" value="4"> 4 or more</option>
                     <option name="select3" value="3"> 3 or more</option>
                     <option name="select4" value="2"> 2 or more</option>
                     <option name="select5" value="1"> 1 or more</option>
                 </select>
         </section>
        <section>
        ${generatingBookmarks()}
        
        </section> 
`;
}
// Loop through array. 

function generatingBookmarks() {
  let html = '<ul>';
  for (let i = 0; i < store.bookMarksList.length; i++) {
    let bookmarkResult = store.bookMarksList[i];
    if (bookmarkResult.rating >= store.filterValue) {
      html += `
  <li>${bookmarkResult.title} ${bookmarkResult.rating}</li>
    `;
    }
  }
  html += '</ul>';
  return html;
}


function render() {
  let html = '';

  if (store.adding === false) {
    html += generateFirstPage();
  } else {
    html += renderAddBookmark();
  }
  $('main').html(html);
}

// Event Handlers 

function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

function handleBookMarkSubmission() {
  $('main').on('submit', '.add-bookmark-form', function (event) {
    event.preventDefault();
    // capture values of form submission 
    let form = $('.add-bookmark-form')[0];
    let bookmark = serializeJson(form);

    // calling POST API
    api.addBookMark(bookmark).then(resultJson => {
      store.addBookMark(resultJson);
      store.adding = false;
      render();
    }) //wait for the server to respond with the object which has the ID
      .catch(error => {
        if (error) {
          // add store error object
          console.log(error);
        }
      });
  });
}

function returnToHomePage() {
  $('main').on('click', '.return', function (event) {
    store.adding = false;
    render();
  });
}


function handleFilterBookmarkRating () {
$('main').on('change', '#filter-dropdown', function (event) {
 let rating = $('#filter-dropdown').val();
 store.filterValue = rating;
 render();
});
}

function goToNewBookmark() {
  $('main').on('click', '.add-bookmark', function (event) {
    store.adding = true;
    render();
  });
}

function setEventHandlers() {
  goToNewBookmark();
  returnToHomePage();
  handleBookMarkSubmission();
  handleFilterBookmarkRating();
}

// Listeners To do's
// filter select change 
// expand listener 
// delete button 

export default {
  render,
  setEventHandlers
};