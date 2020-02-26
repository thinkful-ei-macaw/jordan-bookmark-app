import api from './api.js';
import bookmark from './bookmark.js';
import store from './store.js';

function main () {
  console.log('Is this working');
  bookmark.render();
  bookmark.setEventHandlers();
}









//First thing is executed 
$(main);
