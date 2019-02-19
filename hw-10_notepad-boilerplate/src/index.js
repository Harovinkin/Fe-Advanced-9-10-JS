import './sass/main.scss';

import initialNotes from './assets/notes.json';
import Notepad from './js/notepad-model';
import { getRefs, renderNoteList } from './js/view';
import {
  handleNoteEditorSubmit,
  handleRemoveNote,
  handleSearchNotesByQuery,
} from './js/handlers';

// Notepad Instance initialization
export const notepad = new Notepad(initialNotes);

// UI Refs
const refs = getRefs();

// Render Initial Notes
renderNoteList(refs.list, notepad.notes);

// Listeners
refs.noteEditor.addEventListener('submit', handleNoteEditorSubmit);
refs.notesList.addEventListener('click', handleRemoveNote);
refs.searchNotesByQuery.addEventListener('input', handleSearchNotesByQuery);
