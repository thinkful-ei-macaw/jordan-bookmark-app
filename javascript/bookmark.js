import api from './api.js';
import store from './store.js';

function createNewBookmark() {
    console.log('createNewBookmark');
  $('.add-bookmark').click(function () {
    console.log('creatNewBookMark2');
    $('.bookmark-container').html( `
    <header class="head-container">
        <h1 id="headline">My bookmarks</h1>
    </header>
    <form>
        <label for="title">Title</label><br>
        <input type="text" id="title" name="title"><br>
        <label for="description">Description</label><br>
        <input type="textarea" id="desc" name="description">
        <select name="ratings" id="rating">
            <option class="filtertop" name="select0" value="0">Filter by rating</option>
            <option name="select1" value="5"> 5 or more</option>
            <option name="select2" value="4"> 4 or more</option>
            <option name="select3" value="3"> 3 or more</option>
            <option name="select4" value="2"> 2 or more</option>
            <option name="select5" value="1"> 1 or more</option>
        </select>
        <label for="url">URL</label><br>
        <input type="textarea" id="url" name="description">  
    </form>
    <button class="return">Return to Bookmarks</button>`);
  });
}
 const returnToHomePage = function () {
    $('.return').on('click', function(){
    console.log('return');
    generateFirstPage();
 });
};

function deleteBookMark() {


}

function updateBookMark() {


}

function render() {
  generateFirstPage();
  createNewBookmark();

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



export default {
  render, 
  returnToHomePage
};