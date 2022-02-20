/* global data */
/* exported data */

// CREATE
var createEntryForm = document.querySelector('#create-entry-form');
var createEntryPage = document.querySelector('.container');
var inputs = document.querySelector('#create-entry-form').elements;
var photoInput = document.querySelector('#photo-url');
var image = document.querySelector('img');
var viewEntriesButton = document.querySelector('.view-entries-button');

var emptyView = document.querySelector('.empty-view');

checkEmptyEntries();

function checkEmptyEntries() {
  if (data.entries.length > 0) {
    emptyView.className = 'empty-view hidden';
  } else {
    emptyView.className = 'empty-view';
  }
}

var viewEntryPage = document.querySelector('.container-view-entries');
var newButton = document.querySelector('.new-button');

var editForm = document.querySelector('.container-edit');

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

  checkEmptyEntries();

  createEntryPage.className = 'container hidden';
  viewEntryPage.className = 'container-view-entries';
}

viewEntriesButton.addEventListener('click', viewEntries);

function viewEntries(event) {
  createEntryPage.className = 'container hidden';
  viewEntryPage.className = 'container-view-entries';
  editForm.className = 'container-edit hidden';
}

newButton.addEventListener('click', newEntry);

function newEntry(event) {
  createEntryPage.className = 'container';
  viewEntryPage.className = 'container-view-entries hidden';
}

// VIEW
function entryTree(entry) {

  var li = document.createElement('li');
  li.setAttribute('id', 'entry-row');
  li.setAttribute('class', 'number' + entry.nextEntryId);
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
var editEntryForm = document.querySelector('#edit-entry-form');
var editInputs = document.querySelector('#edit-entry-form').elements;

var editPhotoInput = document.querySelector('#edit-photo-url');
var editImage = document.querySelector('.edit-photo');

var currentID = '';

editPhotoInput.addEventListener('input', editChangePhoto);

function editChangePhoto(event) {
  editImage.src = editInputs[1].value;
}

var pen = document.querySelector('ul');

pen.addEventListener('click', editEntryClick);

function editEntryClick(event) {
  var element = event.target.closest('i');
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].nextEntryId === parseInt(element.id)) {
      editInputs[0].value = data.entries[i].title;
      editInputs[1].value = data.entries[i].photoURL;
      editInputs[2].value = data.entries[i].notes;
      currentID = data.entries[i].nextEntryId;
      editChangePhoto();
      break;
    }
  }
  createEntryPage.className = 'container hidden';
  viewEntryPage.className = 'container-view-entries hidden';
  editForm.className = 'container-edit';

}

editEntryForm.addEventListener('submit', editNewEntry);

function editNewEntry(event) {
  event.preventDefault();

  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].nextEntryId === parseInt(currentID)) {
      data.entries[i].title = editInputs[0].value;
      data.entries[i].photoURL = editInputs[1].value;
      data.entries[i].notes = editInputs[2].value;

      var previousID = document.querySelector('.number' + data.entries[i].nextEntryId.toString());
      previousID.replaceWith(entryTree(data.entries[i]));

      break;
    }
  }
  document.querySelector('#edit-entry-form').reset();

  checkEmptyEntries();

  createEntryPage.className = 'container hidden';
  viewEntryPage.className = 'container-view-entries';
  editForm.className = 'container-edit hidden';

}

// DELETE
var deleteButton = document.querySelector('.delete-entry');
var buttonConfirm = document.querySelector('.confirm');
var buttonCancel = document.querySelector('.cancel');
var dialogBox = document.querySelector('.box');

var inputEdit = document.querySelector('input');
var textArea = document.querySelector('textarea');
var saveEdit = document.querySelector('.edit-save-button');

deleteButton.addEventListener('click', openBox);
buttonConfirm.addEventListener('click', replyBoxConfirm);
buttonCancel.addEventListener('click', replyBoxCancel);

function openBox(event) {
  deleteButton.disabled = true;
  inputEdit.disabled = true;
  textArea.disabled = true;
  saveEdit.disabled = true;
  viewEntriesButton.disabled = true;
  dialogBox.className = 'box open';
}

function replyBoxCancel(event) {
  event.preventDefault();
  deleteButton.disabled = false;
  inputEdit.disabled = false;
  textArea.disabled = false;
  saveEdit.disabled = false;
  viewEntriesButton.disabled = false;
  dialogBox.className = 'box closed';
}

function replyBoxConfirm(event) {
  event.preventDefault();

  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].nextEntryId === parseInt(currentID)) {
      var previousID = document.querySelector('.number' + data.entries[i].nextEntryId.toString());
      previousID.remove();

      data.entries.splice(i, 1);
      break;
    }
  }

  checkEmptyEntries();

  deleteButton.disabled = false;
  inputEdit.disabled = false;
  textArea.disabled = false;
  saveEdit.disabled = false;
  viewEntriesButton.disabled = false;
  dialogBox.className = 'box closed';

  createEntryPage.className = 'container hidden';
  viewEntryPage.className = 'container-view-entries';
  editForm.className = 'container-edit hidden';
}
