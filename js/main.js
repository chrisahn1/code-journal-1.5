/* global data */
/* exported data */
var createEntryForm = document.querySelector('#create-entry-form');
var createEntryPage = document.querySelector('.container');
var inputs = document.querySelector('#create-entry-form').elements;
var photoInput = document.querySelector('#photo-url');
var image = document.querySelector('img');
var viewEntriesButton = document.querySelector('.view-entries-button');

var viewEntryPage = document.querySelector('.container-view-entries');
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
