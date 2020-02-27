import api from './api.js';
import store from './store.js';

// Template Generator Functions 

/**Generates first page on load */

function generateFirstPage() {
  return `
    <header class="head-container">
             <h1 id="headline underline underlined-dotted">My bookmarks</h1>
         </header>
         <section class="button-section">
             <button class="add-bookmark">Add new bookmark</button>
             <label class="filter-rating" aria-label="filter by rating"></label>
                 <select name="ratings" id="filter-dropdown">
                     <option ${store.filterValue === 0 ? 'selected' : ''} value="0" class="filter-top" name="select0">Filter by rating:</option>
                     <option ${store.filterValue === 5 ? 'selected' : ''} value="5"> 5</option>
                     <option ${store.filterValue === 4 ? 'selected' : ''} value="4"> 4 or more</option>
                     <option ${store.filterValue === 3 ? 'selected' : ''} value="3"> 3 or more</option>
                     <option ${store.filterValue === 2 ? 'selected' : ''} value="2"> 2 or more</option>
                     <option ${store.filterValue === 1 ? 'selected' : ''} value="1"> 1 or more</option>
                 </select>
         </section>
        <section>
        ${generatingBookmarks()}
        
        </section> 
`;
}

/**Function to open up Add bookmark form */

function renderAddBookmark() {
  return `
    <header class="head-container">
        <h1 id="headline">My bookmarks</h1>
    </header>
    <form class="add-bookmark-form">
        <label for="title">Add bookmark title:</label><br>
        <input type="text" id="title" name="title" placeholder="Add a bookmark"><br>
        <label for="rating">Add rating (1-5):</label>
        <input type="number" id="rating" name="rating" min="1" max="5" placeholder="4">
        <label for="url">Enter url:</label><br>
        <input type="url" id="url" name="url" placeholder="www.google.com"> 
        <label for="desc">Enter description:</label><br>
        <textarea id="desc" name="desc"></textarea>
        <button class="add-new-bookmark-button">Submit</button> 
    </form>
    <button class="return" type="button">Cancel</button>
    `;
}

/** Function to generate bookmarks */

function generatingBookmarks() {
  let html = '<ul class="bookmark-list-section">';
  for (let i = 0; i < store.bookMarksList.length; i++) {
    let bookmarkResult = store.bookMarksList[i];
    if (bookmarkResult.rating >= store.filterValue) {
      html += `
  <li data-id="${bookmarkResult.id}"><span class="bmTitle">${bookmarkResult.title}</span><span class="bmRating">${bookmarkResult.rating}</span>
  </li>
    `;
      if (bookmarkResult.expanded) {
        html += `
      <p class="bookmark-description">${bookmarkResult.desc} <br>
      <a href="${bookmarkResult.url}" class="bookmark-url-result">Visit website</a></p> 
      <button data-id="${bookmarkResult.id}"class="delete-bookmark">Delete bookmark</button>
      `;
      }
    }
  }
  html += '</ul>';
  return html;
}


function generateErrors () {
  return `
  <p>${store.error.message}</p>
  `;
}

function render() {
  let html = '';
  if(store.error) html += generateErrors();

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
          store.error = error;
          render();
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
    store.filterValue = parseInt(rating);
    render();
  });
}

function goToNewBookmark() {
  $('main').on('click', '.add-bookmark', function (event) {
    store.adding = true;
    render();
  });
}


function handleBookmarkExpand (){
  $('main').on('click', 'li', event => {
    let id = $(event.currentTarget).data('id');
    let currentBookmark = store.findID(id);
    currentBookmark.expanded = !currentBookmark.expanded;
    render();
  });
}

function handleBookmarkDelete () {
  $('main').on('click', '.delete-bookmark', event => {
    let id = $(event.currentTarget).data('id');
    api.deleteBookmarkItems(id)
      .then(resultJson => {
        store.deleteBookMark(id);
        render();
      }) 
      .catch(error => {
        if (error) {
          store.error = error;
          render();
        }
      });
  });
}


function setEventHandlers() {
  goToNewBookmark();
  returnToHomePage();
  handleBookMarkSubmission();
  handleFilterBookmarkRating();
  handleBookmarkExpand();
  handleBookmarkDelete();
}

export default {
  render,
  setEventHandlers
};