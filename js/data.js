/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousTodosJSON = localStorage.getItem('code-journal-1.5');

if (previousTodosJSON !== null) {
  data = JSON.parse(previousTodosJSON);
}

window.addEventListener('beforeunload', storingData);

function storingData(event) {
  var todosJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-1.5', todosJSON);
}
