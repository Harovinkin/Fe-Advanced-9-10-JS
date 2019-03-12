import noteTemplate from '../templates/note.hbs';

// Refs
export const getRefs = () => ({
  searchNotesByQuery: document.querySelector('form .search-form__input'),
  notesList: document.querySelector('ul.note-list'),
  noteEditor: document.querySelector('form.note-editor'),
  openEditorModalBtn: document.querySelector(
    'button[data-action="open-editor"]',
  ),
});

// UI
const createListItem = (note, PRIORITIES) => {
  return noteTemplate({ ...note, priority: PRIORITIES[note.priority].name });
};

export const createListItemsMarkup = (listRef, notes, { PRIORITIES }) => {
  const markup = notes.map(note => createListItem(note, PRIORITIES)).join('');

  listRef.innerHTML = '';

  listRef.insertAdjacentHTML('beforeend', markup);
};

export const addListItemMarkup = (listRef, note, { PRIORITIES }) => {
  const markup = createListItem(note, PRIORITIES);

  listRef.insertAdjacentHTML('beforeend', markup);
};

export const findParentListItem = child => {
  const parentListItem = child.closest('.note-list__item');

  return parentListItem;
};

export const removeListItem = listItem => {
  listItem.remove();
};
