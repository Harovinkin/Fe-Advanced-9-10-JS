'use strict';

/*
  Note Schema
    id: integer | string
    title: string
    body: string
    priority: integer [0-2]
*/

// MAP OF PRIORIYIES

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

// MODEL
function Notebook() {
  this.notes = [];

  // Пролучить заметки
  this.getNotes = function() {
    return this.notes;
  };
  // Найти заметку по id
  this.findNoteById = function(id) {
    for (const note of this.notes) {
      if (note.id === id) return note;
    }
  };
  // Сохранить заметку
  this.saveNote = function(note) {
    this.notes.push(note);
  };
  // Удалить заметку
  this.deleteNote = function(id) {
    for (let i = 0; i < this.notes.length; i += 1) {
      const note = this.notes[i];
      if (note.id !== id) continue;
      this.notes.splice(i, 1);
      return;
    }
  };
  // Обновить контент заметки
  this.updateNoteContent = function(id, { field, value }) {
    const note = this.findNoteById(id);
    if (!note) return;
    note[field] = value;
  };
  // Обновить приоритет заметки
  this.updateNotePriority = function(id, ptiority) {
    const note = this.findNoteById(id);
    if (!note) return;
    note.priority = ptiority;
  };
  // Отфильтровать по критерию
  this.filterNotes = function(query = '') {
    const filteredNotes = [];

    for (const note of this.notes) {
      const { title, body } = note;
      const noteContent = `${title} ${body}`;
      const hasQuery = noteContent
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase());

      if (!hasQuery) continue;
      filteredNotes.push(note);
    }

    return filteredNotes;
  };
}

// NOTES

const newNotebook = new Notebook();

newNotebook.saveNote({
  id: 1,
  title: 'JavaScript essentials',
  body:
    'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
  priority: PRIORITY_TYPES.HIGH,
});

newNotebook.saveNote({
  id: 2,
  title: 'Refresh HTML and CSS',
  body:
    'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
  priority: PRIORITY_TYPES.NORMAL,
});

newNotebook.saveNote({
  id: 3,
  title: 'Get comfy with Frontend Frameworks',
  body:
    'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: PRIORITY_TYPES.NORMAL,
});

newNotebook.saveNote({
  id: 4,
  title: 'Winter clothes',
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: PRIORITY_TYPES.LOW,
});

// Смотрю что у меня в заметках
console.log('Все текущие заметки: ', newNotebook.getNotes());

// Поиск заметки по id
console.log('Заметка по id: ', newNotebook.findNoteById(3));

// Зима уже близко, пора поднять приоритет на покупку одежды
newNotebook.updateNotePriority(4, PRIORITY_TYPES.NORMAL);
// Смотрю что у меня в заметках
console.log(
  'Заметки после обновления приоритета для id 4: ',
  newNotebook.getNotes(),
);

// Решил что фреймворки отложу немного, понижаю приоритет
newNotebook.updateNotePriority(3, PRIORITY_TYPES.LOW);
// Смотрю что у меня в заметках
console.log(
  'Заметки после обновления приоритета для id 3: ',
  newNotebook.getNotes(),
);

// Решил отфильтровать заметки по слову html
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  newNotebook.filterNotes('html'),
);

// Решил отфильтровать заметки по слову javascript
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  newNotebook.filterNotes('javascript'),
);

// Повторил HTML и CSS, удаляю запись по id
newNotebook.deleteNote(2);
// Смотрю что у меня в заметках
console.log('Заметки после удаления с id 2: ', newNotebook.getNotes());

// Обновим заметку с id 3
newNotebook.updateNoteContent(3, {
  field: 'title',
  value: 'Get comfy with React.js',
});

// // Смотрю что у меня в заметках
console.log('Заметки после обновления с id 3: ', newNotebook.getNotes());
