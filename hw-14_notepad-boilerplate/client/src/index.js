import { Notyf } from 'notyf';
import MicroModal from 'micromodal';

import Notepad from './js/notepad-model';
import {
  getRefs,
  createListItemsMarkup,
  addListItemMarkup,
  findParentListItem,
  removeListItem,
} from './js/view';

import storage from './js/local-storage/storage';
import {
  localStorageMessageSave,
  inputStorageSavedModalText,
} from './js/local-storage/localstorage';

import './sass/main.scss';
import 'notyf/notyf.min.css';

export const notepad = new Notepad();

// UI Refs
const refs = getRefs();
const notyf = new Notyf();

// Getting Data from Notepad
const getSavedNote = async (titleText, bodyText) => {
  try {
    const savedNote = await notepad.saveNote(titleText, bodyText);

    addListItemMarkup(refs.notesList, savedNote, Notepad);

    notyf.success(Notepad.NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);

    MicroModal.close('note-editor-modal');

    storage.del(Notepad.LOCAL_STORAGE.MODAL_TEXT_KEY);
  } catch (err) {
    console.error('Error while Fetching: ' + err);
  }
};

// Getting Rested Notes after Deleted
const getRestedNotes = async (listItemId, listItem) => {
  try {
    await notepad.deleteNote(listItemId);

    removeListItem(listItem);

    notyf.success(Notepad.NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
  } catch (err) {
    console.error('Error while Fetching: ' + err);
  }
};

// Handlers
// ==================

// Open Modal Editor
const handleOpenModal = ({ target }) => {
  MicroModal.show('note-editor-modal');

  const savedModalText = storage.load(Notepad.LOCAL_STORAGE.MODAL_TEXT_KEY);

  if (savedModalText) {
    inputStorageSavedModalText(savedModalText, refs);
  }
};

// Add New Note
const handleSaveNoteEditorSubmit = e => {
  e.preventDefault();

  const [text, body] = e.currentTarget.elements;
  const titleText = text.value;
  const bodyText = body.value;

  if (titleText.trim() === '' || bodyText.trim() === '') {
    notyf.error(Notepad.NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
    return;
  }

  getSavedNote(titleText, bodyText);

  e.currentTarget.reset();
};

// Note Aclion
const handleListClick = ({ target }) => {
  const btn = target.parentNode;

  if (btn.nodeName !== 'BUTTON') return;

  const listItem = findParentListItem(btn);
  const listItemId = listItem.dataset.id;

  const btnAction = btn.dataset.action;

  switch (btnAction) {
    // Delete Note
    case Notepad.NOTE_ACTIONS.DELETE:
      getRestedNotes(listItemId, listItem);

      break;

    // Update Note
    case Notepad.NOTE_ACTIONS.EDIT:
      MicroModal.show('note-editor-modal');

      // const response = notepad.getNoteById(listItemId);
      // console.log(response.body);
      break;
  }
};

// Notes Filter
const handleSearchNotesByQuery = ({ target }) => {
  const inputQuery = target.value;

  notepad
    .filterNotesByQuery(inputQuery)
    .then(foundNotes =>
      createListItemsMarkup(refs.notesList, foundNotes, Notepad),
    );
};

// Writing Modal's text in localStorage
const handleModalTextInput = e => {
  const modalInputFilds = e.currentTarget.elements;

  localStorageMessageSave(modalInputFilds, Notepad);
};

// Render initial Notes

const uploadInitialNotes = async () => {
  try {
    const notes = await notepad.getNotes();

    if (!notes.length) {
      notyf.error(Notepad.NOTIFICATION_MESSAGES.NOTES_ARE_NOT);

      return;
    }

    createListItemsMarkup(refs.notesList, notes, Notepad);
  } catch (err) {
    console.error('Error while Fetching: ' + err);
  }
};

uploadInitialNotes();

// Listeners
refs.noteEditor.addEventListener('submit', handleSaveNoteEditorSubmit);
refs.notesList.addEventListener('click', handleListClick);
refs.searchNotesByQuery.addEventListener('input', handleSearchNotesByQuery);
refs.openEditorModalBtn.addEventListener('click', handleOpenModal);

refs.noteEditor.addEventListener('input', handleModalTextInput);
