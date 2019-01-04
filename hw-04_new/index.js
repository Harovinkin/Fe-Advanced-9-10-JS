'use strict';

/*
NOTE Schema

id: string | integer - - уникальный идентификатор объекта, чтобы можно было найти его в коллекции.
title: string - заголовок заметки, строка.
body: string - текст заметки, строка.
priority: integer [0-2] -  значение приоритета, от 0 (низкий) до 2 (высокий).
*/

// MAP of PRIORITY

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

// NOTEBOOK Obj

const notebook = {
  notes: [],

  getNotes() {
    /*
      Принимает: ничего
      Возвращает: все заметки, значение свойства notes
    */

    return this.notes;
  },

  findNoteById(id) {
    /*
      Ищет заметку в массиве notes

      Принимает: идентификатор заметки
      Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
    */

    for (const note of this.notes) {
      if (note.id !== id) continue;
      return note;
    }
  },

  saveNote(note) {
    /*
      Сохраняет заметку в массив notes

      Принимает: объект заметки
      Возвращает: сохраненную заметку
    */

    this.notes.push(note);

    return note;
  },

  deleteNote(id) {
    /*
      Удаляет заметку по идентификатору из массива notes

      Принимает: идентификатор заметки
      Возвращает: ничего
    */

    for (let i = 0; i < this.notes.length; i += 1) {
      if (this.notes[i].id !== id) continue;
      this.notes.splice(i, 1);

      return;
    }
  },

  updateNoteContent(id, { title, body }) {
    /*
      Обновляет контент заметки
      updatedContent - объект с полями вида {имя: значение, имя: значение}
      Свойств в объекте updatedContent может быть произвольное количество

      Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
      Возвращает: обновленную заметку
    */

    const note = this.findNoteById(id);
    if (title) note.title = title;
    if (body) note.body = body;

    return note;
  },

  updateNotePriority(id, priority) {
    /*
      Обновляет приоритет заметки

      Принимает: идентификатор заметки и ее новый приоритет
      Возвращает: обновленную заметку
    */
    const note = this.findNoteById(id);

    return (note.priority = priority);
  },

  filterNotes(query = '') {
    /*
      Фильтрует массив заметок по подстроке query.
      Если значение query есть в заголовке или теле заметки, то она подходит

      Принимает: подстроку для поиска в title и body заметки
      Возвращает: новый массив заметок, контент которых содержит подстроку
    */

    const filteredNotes = [];

    query.toLowerCase();

    for (const note of this.notes) {
      const noteContent = `${note.title} ${note.body}`;
      const hasQuery = noteContent.toLowerCase().includes(query);

      if (!hasQuery) continue;
      filteredNotes.push(note);
    }

    return filteredNotes;
  },

  filterByPriority(priority) {
    /*
    Принимает: приоритет.
    Возвращает: новый массив только с теми заметками, приоритет которых, подходит.
    */

    const filtredNotes = [];

    for (const note of this.notes) {
      if (note.priority !== priority) continue;
      filtredNotes.push(note);
    }

    return filtredNotes;
  },
};

// CODE CHECKING

/*
  Добавляю 4 заметки и смотрю что получилось
*/
notebook.saveNote({
  id: 1,
  title: 'JavaScript essentials',
  body:
    'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
  priority: PRIORITY_TYPES.HIGH,
});

notebook.saveNote({
  id: 2,
  title: 'Refresh HTML and CSS',
  body:
    'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
  priority: PRIORITY_TYPES.NORMAL,
});

notebook.saveNote({
  id: 3,
  title: 'Get comfy with Frontend frameworks',
  body:
    'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: PRIORITY_TYPES.NORMAL,
});

notebook.saveNote({
  id: 4,
  title: 'Winter clothes',
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: PRIORITY_TYPES.LOW,
});

console.log('Все текущие заметки: ', notebook.getNotes());

/*
  Зима уже близко, пора поднять приоритет на покупку одежды
*/
notebook.updateNotePriority(4, PRIORITY_TYPES.NORMAL);
// Смотрю что у меня в заметках
console.log(
  'Заметки после обновления приоритета для id 4: ',
  notebook.getNotes(),
);

/*
  Решил что фреймворки отложу немного, понижаю приоритет
*/
notebook.updateNotePriority(3, PRIORITY_TYPES.LOW);
console.log(
  'Заметки после обновления приоритета для id 3: ',
  notebook.getNotes(),
);

/*
  Решил отфильтровать заметки по слову html
*/
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notebook.filterNotes('html'),
);

/*
  Решил отфильтровать заметки по слову javascript
*/
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notebook.filterNotes('javascript'),
);

/*
  Обновим контент заметки с id 3
*/
console.log(
  notebook.updateNoteContent(3, { title: 'Get comfy with React.js or Vue.js' }),
);
console.log(
  'Заметки после обновления контента заметки с id 3: ',
  notebook.getNotes(),
);

/*
  Повторил HTML и CSS, удаляю запись c id 2
*/
notebook.deleteNote(2);
console.log('Заметки после удаления с id 2: ', notebook.getNotes());

notebook.getNotes();

/*
Решил отфильтровать заметки по приоритету
*/
console.log(
  'Отфильтровали заметки по приоритету: ',
  notebook.filterByPriority(PRIORITY_TYPES.HIGH),
);
