import Notepad from './notepad-model';
import { notepad } from '../index';

// Refs
export const getRefs = () => ({
  searchNotesByQuery: document.querySelector('form .search-form__input'),
  notesList: document.querySelector('ul.note-list'),
  noteEditor: document.querySelector('form.note-editor'),
  list: document.querySelector('.note-list'),
});

// UI
const createNoteContent = (title, body) => {
  const contentBox = document.createElement('div');
  contentBox.classList.add('note__content');

  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = title;

  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = body;

  contentBox.append(noteTitle, noteBody);

  return contentBox;
};

const createFooterSection = () => {
  const footerSection = document.createElement('section');
  footerSection.classList.add('note__section');

  return footerSection;
};

const createActionButton = (noteAction, iconType) => {
  const button = document.createElement('button');
  button.classList.add('action');
  button.dataset.action = noteAction;

  const icon = document.createElement('i');
  icon.classList.add('material-icons');
  icon.classList.add('action__icon');
  icon.textContent = iconType;

  button.appendChild(icon);

  return button;
};

const createNotePriority = priority => {
  const notePriority = document.createElement('span');
  notePriority.classList.add('note__priority');
  notePriority.textContent = `Priority: ${Notepad.PRIORITIES[priority].name}`;

  return notePriority;
};

const createNoteFooter = priority => {
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  // Priority Section
  const prioritySection = createFooterSection();

  const NOTE_ACTIONS = Notepad.NOTE_ACTIONS;
  const ICON_TYPES = Notepad.ICON_TYPES;

  const expandMoreButton = createActionButton(
    NOTE_ACTIONS.DECREASE_PRIORITY,
    ICON_TYPES.ARROW_DOWN,
  );

  const expandLessButton = createActionButton(
    NOTE_ACTIONS.INCREASE_PRIORITY,
    ICON_TYPES.ARROW_UP,
  );

  const notePriority = createNotePriority(priority);

  // Edit Section
  const editSection = createFooterSection();

  const editButton = createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT);

  const deleteButton = createActionButton(
    NOTE_ACTIONS.DELETE,
    ICON_TYPES.DELETE,
  );

  prioritySection.append(expandMoreButton, expandLessButton, notePriority);

  editSection.append(editButton, deleteButton);

  noteFooter.append(prioritySection, editSection);

  return noteFooter;
};

const createListItem = ({ id, title, body, priority }) => {
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = id;

  const noteBox = document.createElement('div');
  noteBox.classList.add('note');

  const noteContent = createNoteContent(title, body);

  const noteFooter = createNoteFooter(priority);

  noteBox.append(noteContent, noteFooter);

  listItem.appendChild(noteBox);

  return listItem;
};

export const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(note => createListItem(note));

  listRef.innerHTML = '';

  listRef.append(...listItems);
};

export const addListItem = (listRef, note) => {
  const listItem = createListItem(note);

  listRef.appendChild(listItem);
};

export const removeListItem = item => {
  const removeListItem = item.closest('.note-list__item');

  notepad.deleteNote(removeListItem.dataset.id);

  removeListItem.remove();
};
