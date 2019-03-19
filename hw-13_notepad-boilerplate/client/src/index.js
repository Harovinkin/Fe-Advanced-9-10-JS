import Notyf from 'notyf';
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
import 'notyf/dist/notyf.min.css';

export const notepad = new Notepad();

// UI Refs
const refs = getRefs();
const notyf = new Notyf();

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

  notepad
    .saveNote(titleText, bodyText)
    .then(savedNote => {
      addListItemMarkup(refs.notesList, savedNote, Notepad);

      notyf.confirm(Notepad.NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS);

      MicroModal.close('note-editor-modal');

      storage.del(Notepad.LOCAL_STORAGE.MODAL_TEXT_KEY);
    })
    .catch(err => {
      console.error(err);
    });
  e.currentTarget.reset();
};

// Note Aclion
const handleListClick = ({ target }) => {
  const btn = target.parentNode;

  if (btn.nodeName !== 'BUTTON') return;

  const btnAction = btn.dataset.action;

  switch (btnAction) {
    // Delete Note
    case Notepad.NOTE_ACTIONS.DELETE:
      let listItem = findParentListItem(btn);

      let listItemId = listItem.dataset.id;

      notepad
        .deleteNote(listItemId)
        .then(() => {
          removeListItem(listItem);
          notyf.confirm(Notepad.NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS);
        })
        .catch(err => {
          console.log(err);
        });

      break;

    // Update Note
    case Notepad.NOTE_ACTIONS.EDIT:
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

// Render initials Notes
notepad.getNotes
  .then(notes => {
    if (!notes.length) {
      notyf.alert(Notepad.NOTIFICATION_MESSAGES.NOTES_ARE_NOT);

      return;
    }

    createListItemsMarkup(refs.notesList, notes, Notepad);
  })
  .catch(err => {
    console.error(err);
  });

// Listeners
refs.noteEditor.addEventListener('submit', handleNoteEditorSubmit);
refs.notesList.addEventListener('click', handleListClick);
refs.searchNotesByQuery.addEventListener('input', handleSearchNotesByQuery);
refs.openEditorModalBtn.addEventListener('click', handleOpenModal);

refs.noteEditor.addEventListener('input', handleModalTextInput);
