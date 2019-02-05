'use strict';

// Конструктор Notepad при инициализации принимает массив заметок

//  Model

class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  get notes() {
    /*
     * Принимает: ничего
     * Возвращает: все заметки, значение свойства notes
     */

    return this._notes;
  }

  /*
   * Добавьте статический метод Notepad.getPriorityName(priorityId), который получает идентификатор приоритета и возвращает значение поля name из карты приоритетов.
   */

  static getPriorityName(priorityId) {
    // Ваш код

    return this.PRIORITIES[priorityId].name;
  }

  findNoteById(id) {
    /*
     * Ищет заметку в массиве notes
     *
     * Принимает: идентификатор заметки
     * Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
     */

    for (const note of this.notes) {
      if (note.id !== id) continue;

      return note;
    }
  }

  saveNote(note) {
    /*
     * Сохраняет заметку в массив notes
     *
     * Принимает: объект заметки
     * Возвращает: сохраненную заметку
     */

    this.notes.push(note);

    return note;
  }

  deleteNote(id) {
    /*
     * Удаляет заметку по идентификатору из массива notes
     *
     * Принимает: идентификатор заметки
     * Возвращает: ничего
     */

    for (let i = 0; i < this.notes.length; i += 1) {
      if (this.notes[i].id !== id) continue;

      this.notes.splice(i, 1);

      return;
    }
  }

  updateNoteContent(id, updatedContent) {
    /*
     * Обновляет контент заметки
     * updatedContent - объект с полями вида {имя: значение, имя: значение}
     * Свойств в объекте updatedContent может быть произвольное количество
     *
     * Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
     * Возвращает: обновленную заметку
     */

    const note = this.findNoteById(id);
    if (!note) return;

    const updatedContentKeys = Object.keys(updatedContent);
    const noteKeys = Object.keys(note);

    for (const key of updatedContentKeys) {
      const hasKey = noteKeys.includes(key);

      if (!hasKey) continue;

      note[key] = updatedContent[key];
    }

    return note;
  }

  updateNotePriority(id, priority) {
    /*
     * Обновляет приоритет заметки
     *
     * Принимает: идентификатор заметки и ее новый приоритет
     * Возвращает: обновленную заметку
     */

    const note = this.findNoteById(id);

    if (!note) return;

    note.priority = priority;

    return note;
  }

  filterNotesByQuery(query = '') {
    /*
     * Фильтрует массив заметок по подстроке query.
     * Если значение query есть в заголовке или теле заметки - она подходит
     *
     * Принимает: подстроку для поиска в title и body заметки
     * Возвращает: новый массив заметок, контент которых содержит подстроку
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
  }

  filterNotesByPriority(priority) {
    /*
     * Фильтрует массив заметок по значению приоритета
     * Если значение priority совпадаем с приоритетом заметки - она подходит
     *
     * Принимает: приоритет для поиска в свойстве priority заметки
     * Возвращает: новый массив заметок с подходящим приоритетом
     */

    const filtredNotes = [];

    for (const note of this.notes) {
      if (note.priority !== priority) continue;

      filtredNotes.push(note);
    }

    return filtredNotes;
  }
}

/*
  Добавляем статическое свойство, в котором храним карту приоритетов.
*/

Notepad.PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

Notepad.PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
};

/*
  Добавляем статическое свойство, в котором храним карту действий над заметками для подстановки констант.
*/

Notepad.NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

/*
  Добавляем статическое свойство, в котором храним карту имен иконок.
*/

Notepad.ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

/*
 * Добавляю заметки
 */

const initialNotes = [
  {
    id: 1,
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: Notepad.PRIORITY_TYPES.HIGH,
  },
  {
    id: 2,
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: Notepad.PRIORITY_TYPES.NORMAL,
  },
  {
    id: 3,
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: Notepad.PRIORITY_TYPES.NORMAL,
  },
  {
    id: 4,
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: Notepad.PRIORITY_TYPES.LOW,
  },
];

//  Markup

/*
 <li class="note-list__item" data-id="note object id here">

  <div class="note">

    >>> Для функции createNoteContent()

    <div class="note__content">
      <h2 class="note__title">Lorem, ipsum dolor.</h2>
      <p class="note__body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        libero atque, sint quas impedit est illum labore veniam aspernatur neque
        nostrum aliquam dicta blanditiis. Esse porro impedit ratione soluta
        amet?
      </p>
    </div>

    >>> Для функции createNoteFooter()

    <footer class="note__footer">
      <section class="note__section">

        >>> Все кнопки в функции createActionButton

        <button class="action" data-action="decrease-priority">
          <i class="material-icons action__icon">expand_more</i>
        </button>

        <button class="action" data-action="increase-priority">
          <i class="material-icons action__icon">expand_less</i>
        </button>

        <span class="note__priority">Priority: Low</span>
      </section>

      <section class="note__section">

        <button class="action" data-action="edit-note">
          <i class="material-icons action__icon">edit</i>
        </button>

        <button class="action" data-action="delete-note">
          <i class="material-icons action__icon">delete</i>
        </button>

      </section>
    </footer>

  </div>

</li>
 */

// Notepad Instance initialization

const notepad = new Notepad(initialNotes);

// Refs

const refs = {
  list: document.querySelector('.note-list'),
};

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
    ICON_TYPES.ARROW_DOWN
  );

  const expandLessButton = createActionButton(
    NOTE_ACTIONS.INCREASE_PRIORITY,
    ICON_TYPES.ARROW_UP
  );

  const notePriority = createNotePriority(priority);

  // Edit Section

  const editSection = createFooterSection();

  const editButton = createActionButton(NOTE_ACTIONS.EDIT, ICON_TYPES.EDIT);

  const deleteButton = createActionButton(
    NOTE_ACTIONS.DELETE,
    ICON_TYPES.DELETE
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

const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(note => createListItem(note));

  listRef.append(...listItems);
};

renderNoteList(refs.list, notepad.notes);
