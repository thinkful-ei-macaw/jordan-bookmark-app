import api from './api.js';
import bookmark from './bookmark.js';
import store from './store.js';

function main () {
  bookmark.setEventHandlers();
  api.getBookmarkItems().then(resultJson => { 
  for (let i = 0; i < resultJson.length; i++) {
    store.addBookMark(resultJson[i]);
  }
    bookmark.render();
  });
    
}

//First thing is executed 
$(main);
