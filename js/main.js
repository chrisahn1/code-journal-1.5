/* global data */
/* exported data */
var createEntryForm = document.querySelector('#create-entry-form');
var createEntryPage = document.querySelector('.container');
var inputs = document.querySelector('#create-entry-form').elements;
var photoInput = document.querySelector('#photo-url');
var image = document.querySelector('img');
var viewEntriesButton = document.querySelector('.view-entries-button');

var viewEntryPage = document.querySelector('.container-view-entries');
var newButton = document.querySelector('.new-button');
// var viewEntryForm = document.querySelector('#view-entries-form');

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

window.addEventListener('beforeunload', entryTree);

function entryTree(entry) {
  var li = document.createElement('li');
  li.setAttribute('class', 'entry-row');
  var photo = document.createElement('div');
  var image = document.createElement('img');

  photo.setAttribute('class', 'photo-url');
  image.setAttribute('class', 'photo');
  image.setAttribute('src', entry.photoURL);

  photo.appendChild(image);

  var titleDescription = document.createElement('div');
  var title = document.createElement('h2');
  var description = document.createElement('p');

  titleDescription.setAttribute('class', 'title-photo');
  title.setAttribute('class', 'entry-row-title');
  description.setAttribute('class', 'entry-row-description');

  title.textContent = entry.title;
  description.textContent = entry.notes;

  titleDescription.appendChild(title);
  titleDescription.appendChild(description);

  li.appendChild(photo);
  li.appendChild(titleDescription);

  return li;
}

var ul = document.querySelector('.entries-list');

for (var i = 0; i < data.entries.length; i++) {
  ul.appendChild(entryTree(data.entries[i]));
}
