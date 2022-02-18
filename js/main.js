/* global data */
/* exported data */

// CREATE
var createEntryForm = document.querySelector('#create-entry-form');
var createEntryPage = document.querySelector('.container');
var inputs = document.querySelector('#create-entry-form').elements;
var photoInput = document.querySelector('#photo-url');
var image = document.querySelector('img');
var viewEntriesButton = document.querySelector('.view-entries-button');

var viewEntryPage = document.querySelector('.container-view-entries');
var newButton = document.querySelector('.new-button');

photoInput.addEventListener('input', changePhoto);

function changePhoto(event) {
  image.src = inputs[1].value;
}

createEntryForm.addEventListener('submit', createEntry);

function createEntry(event) {
  event.preventDefault();
  var obj = {};

  obj.title = inputs[0].value;
  obj.photoURL = inputs[1].value;
  obj.notes = inputs[2].value;
  obj.nextEntryId = data.nextEntryId;

  data.nextEntryId++;

  data.entries.unshift(obj);

  image.src = 'images/placeholder-image-square.jpg';

  document.querySelector('#create-entry-form').reset();

  var ul = document.querySelector('.entries-list');
  ul.appendChild(entryTree(data.entries[0]));

  createEntryPage.className = 'container hidden';
  viewEntryPage.className = 'container-view-entries';
}

viewEntriesButton.addEventListener('click', viewEntries);

function viewEntries(event) {
  createEntryPage.className = 'container hidden';
  viewEntryPage.className = 'container-view-entries';
}

newButton.addEventListener('click', newEntry);

function newEntry(event) {
  createEntryPage.className = 'container';
  viewEntryPage.className = 'container-view-entries hidden';
}

// VIEW
function entryTree(entry) {

  var emptyView = document.querySelector('.empty-view');
  if (data.entries.length > 0) {
    emptyView.className = 'empty-view hidden';
  } else {
    emptyView.className = 'empty-view';
  }

  var li = document.createElement('li');
  li.setAttribute('class', 'entry-row');
  var photo = document.createElement('div');
  var image = document.createElement('img');

  photo.setAttribute('class', 'entry-photo');
  image.setAttribute('class', 'entry-photo-url');
  image.setAttribute('src', entry.photoURL);

  photo.appendChild(image);

  var titleDescription = document.createElement('div');
  var titleEdit = document.createElement('div');
  var title = document.createElement('h3');
  var editButton = document.createElement('i');
  var description = document.createElement('p');

  titleDescription.setAttribute('class', 'entry-title-description');
  titleEdit.setAttribute('class', 'entry-title-edit');
  title.setAttribute('class', 'entry-row-title');
  editButton.setAttribute('class', 'fa fa-edit');
  editButton.setAttribute('style', 'font-size:24px');
  editButton.setAttribute('aria-hidden', 'true');
  editButton.setAttribute('id', entry.nextEntryId);
  description.setAttribute('class', 'entry-row-description');

  title.textContent = entry.title;
  description.textContent = entry.notes;

  titleEdit.appendChild(title);
  titleEdit.appendChild(editButton);
  titleDescription.appendChild(titleEdit);
  titleDescription.appendChild(description);

  li.appendChild(photo);
  li.appendChild(titleDescription);

  return li;
}

function loadingEntries(event) {
  var ul = document.querySelector('.entries-list');

  for (var i = 0; i < data.entries.length; i++) {
    ul.prepend(entryTree(data.entries[i]));
  }
}

document.addEventListener('DOMContentLoaded', loadingEntries);

// EDIT
var editForm = document.querySelector('.container-edit');
var editEntryForm = document.querySelector('#edit-entry-form');
var editTitle = document.querySelector('#edit-title');
var editDescription = document.querySelector('#edit-textarea');
var editPhotoURL = document.querySelector('#edit-photo-url');
var editPhoto = document.querySelector('.edit-photo');

document.addEventListener('click', editEntryClick);

function editEntryClick(event) {
  var edit = document.querySelectorAll('i');
  for (var i = 0; i < edit.length; i++) {
    if (edit[i].getAttribute('id') === event.target.id) {
      viewEntryPage.className = 'container-view-entries hidden';
      editForm.className = 'container-edit';
      editEntryInputs(edit[i].getAttribute('id'));
      break;
    }
  }
}

function editEntryInputs(entryID) {
  var obj = {};
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].nextEntryId === parseInt(entryID)) {
      obj.photoURL = data.entries[i].photoURL;
      obj.title = data.entries[i].title;
      obj.notes = data.entries[i].notes;
      break;
    }
  }
  editPhoto.src = obj.photoURL;
  editTitle.value = obj.title;
  editPhotoURL.value = obj.photoURL;
  editDescription.value = obj.notes;
}

editEntryForm.addEventListener('submit', editNewEntry);

function editNewEntry(event) {
  event.preventDefault();
  var obj = {};

  obj.title = inputs[0].value;
  obj.photoURL = inputs[1].value;
  obj.notes = inputs[2].value;
  obj.nextEntryId = data.nextEntryId;

  data.nextEntryId++;

  data.entries.unshift(obj);

  image.src = 'images/placeholder-image-square.jpg';

  document.querySelector('#create-entry-form').reset();

  var ul = document.querySelector('.entries-list');
  ul.appendChild(entryTree(data.entries[0]));

  createEntryPage.className = 'container hidden';
  editForm.className = 'container-edit hidden';
  viewEntryPage.className = 'container-view-entries';
}
