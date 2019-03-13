import Notyf from 'notyf';
import MicroModal from 'micromodal';

import initialNotes from './assets/notes.json';
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
import 'notyf/dist/notyf.min.css';

// Notepad Instance initialization
const initialNotesSorce = notes => {
  const localStorageNotes = storage.load(Notepad.LOCAL_STORAGE.NOTES_KEY);

  if (!localStorageNotes) {
    storage.save(Notepad.LOCAL_STORAGE.NOTES_KEY, notes);

    return notes;
  }

  return localStorageNotes;
};

export const notepad = new Notepad(initialNotesSorce(initialNotes));

// UI Refs
const refs = getRefs();
const notyf = new Notyf();

// Handlers
// ==================

// Open Modal Editor
const handleOpenModal = () => {
  MicroModal.show('note-editor-modal');

  const savedModalText = storage.load(Notepad.LOCAL_STORAGE.MODAL_TEXT_KEY);

  if (savedModalText) {
    inputStorageSavedModalText(savedModalText, refs);
  }
};

// Add Note
const handleNoteEditorSubmit = e => {
  e.preventDefault();

  const [text, body] = e.currentTarget.elements;
  const titleText = text.value;
  const bodyText = body.value;

  if (titleText.trim() === '' || bodyText.trim() === '') {
    notyf.alert(Notepad.NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY);
    return;
  }

  notepad.saveNote(titleText, bodyText).then(savedNote => {
    addListItemMarkup(refs.notesList, savedNote, Notepad);

    notyf.confirm(Notepad.NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);

    MicroModal.close('note-editor-modal');

    storage.del(Notepad.LOCAL_STORAGE.MODAL_TEXT_KEY);
  });
  e.currentTarget.reset();
};

// Delete Note
const handleListClick = ({ target }) => {
  const btn = target.parentNode;

  if (btn.nodeName !== 'BUTTON') return;

  const btnAction = btn.dataset.action;

  switch (btnAction) {
    case Notepad.NOTE_ACTIONS.DELETE:
      const listItem = findParentListItem(btn);

      const listItemId = listItem.dataset.id;

      notepad.deleteNote(listItemId).then(() => {
        removeListItem(listItem);
        notyf.confirm(Notepad.NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
      });

      break;

    case Notepad.NOTE_ACTIONS.EDIT:
      // My code
      // alert(btnAction);
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

// Render Notes
createListItemsMarkup(refs.notesList, notepad.notes, Notepad);

// Listeners
refs.noteEditor.addEventListener('submit', handleNoteEditorSubmit);
refs.notesList.addEventListener('click', handleListClick);
refs.searchNotesByQuery.addEventListener('input', handleSearchNotesByQuery);
refs.openEditorModalBtn.addEventListener('click', handleOpenModal);

refs.noteEditor.addEventListener('input', handleModalTextInput);
