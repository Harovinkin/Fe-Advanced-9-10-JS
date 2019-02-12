'use strict';

// Конструктор Notepad при инициализации принимает массив заметок

//  Model
class Notepad {
  static getPriorityName(priorityId) {
    /*
     * Получает: идентификатор приоритета
     * Возвращает: значение поля name из карты приоритетов.
     */
    return this.PRIORITIES[priorityId].name;
  }

  // Generator Note ID (Генератор идентификатора. Вернет уникальную строку при каждом вызове.)
  static generateUniqueId() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }

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

  findNoteById(id) {
    /*
     * Ищет заметку в массиве notes
     *
     * Принимает: идентификатор заметки
     * Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
     */
    return this.notes.find(note => note.id === id);
  }

  saveNote(title, body) {
    /*
     * Сохраняет заметку в массив notes
     *
     * Принимает: объект заметки
     * Возвращает: сохраненную заметку
     */
    const note = {
      id: Notepad.generateUniqueId(),
      title: title,
      body: body,
      priority: Notepad.PRIORITY_TYPES.LOW,
    };

    this._notes.push(note);

    return note;
  }

  deleteNote(id) {
    /*
     * Удаляет заметку по идентификатору из массива notes
     *
     * Принимает: идентификатор заметки
     * Возвращает: ничего
     */
    const note = this.findNoteById(id);
    if (!note) return;

    this._notes = this._notes.filter(note => note.id !== id);
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
    let note = this.findNoteById(id);
    if (!note) return;

    this._notes = this._notes.map(note =>
      note.id === id ? { ...note, ...updatedContent } : note
    );

    return this.findNoteById(id);
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

    this._notes = this._notes.map(note =>
      note.id === id ? { ...note, priority: priority } : note
    );

    return this.findNoteById(id);
  }

  filterNotesByQuery(query = '') {
    /*
     * Фильтрует массив заметок по подстроке query.
     * Если значение query есть в заголовке или теле заметки - она подходит
     *
     * Принимает: подстроку для поиска в title и body заметки
     * Возвращает: новый массив заметок, контент которых содержит подстроку
     */
    return this._notes.filter(note => {
      const noteContent = `${note.title} ${note.body}`;
      const hasQuery = noteContent.toLowerCase().includes(query.toLowerCase());

      if (hasQuery) {
        return note;
      }
    });
  }

  filterNotesByPriority(priority) {
    /*
     * Фильтрует массив заметок по значению приоритета
     * Если значение priority совпадаем с приоритетом заметки - она подходит
     *
     * Принимает: приоритет для поиска в свойстве priority заметки
     * Возвращает: новый массив заметок с подходящим приоритетом
     */
    return this._notes.filter(note => note.priority === priority);
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
    id: Notepad.generateUniqueId(),
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: Notepad.PRIORITY_TYPES.HIGH,
  },
  {
    id: Notepad.generateUniqueId(),
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: Notepad.PRIORITY_TYPES.NORMAL,
  },
  {
    id: Notepad.generateUniqueId(),
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: Notepad.PRIORITY_TYPES.NORMAL,
  },
  {
    id: Notepad.generateUniqueId(),
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: Notepad.PRIORITY_TYPES.LOW,
  },
];

// Notepad Instance initialization
const notepad = new Notepad(initialNotes);

// Refs
const refs = {
  searchNotesByQuery: document.querySelector('form .search-form__input'),
  notesList: document.querySelector('ul.note-list'),
  noteEditor: document.querySelector('form.note-editor'),
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

  listRef.innerHTML = '';

  listRef.append(...listItems);
};

const addListItem = (listRef, note) => {
  const listItem = createListItem(note);

  listRef.appendChild(listItem);
};

const removeListItem = item => {
  const removeListItem = item.closest('.note-list__item');

  notepad.deleteNote(removeListItem.dataset.id);

  removeListItem.remove();
};

// Handlers

/*
  Добавление заметки

  При сабмите формы form.note-editor в массив заметок экземпляра класса Notepad 
  Должен 
    - Добавляться новый объект, 
    - Свойства title и body которого вводит пользователь в поля формы.

  Значение приоритета устанавливается в методе класса 
    - Изначально должно быть самым низким.

  Идентификатор объекта пока что создаем сами, 
    Для этого 
      - Вызывай вспомогательную функцию generateUniqueId написанную ниже, 
        - она вернет уникальную строку при каждом вызове.

  
  Во время сабмита формы:

  Если хотя бы один из инпутов пустой, 
    - выводи alert с текстом 'Необходимо заполнить все поля!' и больше ничего не делай, то есть заметка не добавляется.

  Если все поля заполнены, 
    - выполняй шаги описанные дальше, 
    - но при этом еще очисти поля формы.

  После того как:
    - произошел сабмит формы и 
    - в массив объектов была добавлена новая заметка, 
    в ul.note-list должен добавляться новый элемент с карточкой заметки.

  Функции для добавления объекта в массив и создания элемента списка у тебя уже есть. 
    При этом 
      - рендерить весь список заново нет смысла, 

      Напиши функцию addListItem(listRef, note), 
      Которая:
        - использует функцию создания элемента списка createListItem(note), и 
        - добавлят этот элемент в конец списка ul.note-list (параметр listRef).
 */

const handleNoteEditorSubmit = e => {
  e.preventDefault();

  const [input, textaria] = e.currentTarget.elements;
  const titleText = input.value;
  const bodyText = textaria.value;

  if (titleText.trim() === '' || bodyText.trim() === '') {
    return alert('Необходимо заполнить все поля!');
  }

  const savedNote = notepad.saveNote(titleText, bodyText);

  addListItem(refs.list, savedNote);

  e.currentTarget.reset();
};

/*
  Удаление заметки

  Следующий шаг это 
    - Cделать удаление заметки по клику на кнопке с иконкой корзины, 
      - то есть с data-action=delete-note. 
      
    - Используй паттерн делегированя событий для отслеживания клика на списке ul.note-list и 
    - Проверяй куда кликнули, 

      Доступ к объекту события у тебя есть.

  Узнать какой именно элемент необходимо удалить довольно просто, 
    У каждого элемента списка есть:
      - data-атрибут 
        - data-id в котором указан идентификатор объекта заметки, 

      Метод для удаления элемента из массива объектов у тебя уже есть.

  Для того чтобы получить ссылку на DOM-узел элемента списка и удалить его в интерфейсе, 
    Используй методы:
      - el.closest() и 
      - el.remove(). 
      
      Напиши функцию removeListItem() 
        Которая:
          - скроет в себе реализацию удаления.
*/

const handleRemoveNote = ({ target }) => {
  if (target.parentNode.dataset.action !== 'delete-note') return;

  removeListItem(target);
};

/*
  Фильтрация заметок

  Последним шагом будет фильтрация по подстроке. 

  Каждый раз когда в инпут формы form.search-form что-то вводится, 
  Необходимо 
    - фильтровать массив заметок. 
  
    Метод фильтрации массива у тебя уже есть. 
  
    - После того как произведена фильтрация массива, 
    - отрисуй отфильтрованные заметки функцию renderNoteList (да, просто рисуем заново те что подошли).
*/

const handleSearchNotesByQuery = ({ target }) => {
  const inputQuery = target.value;

  const foundNotes = notepad.filterNotesByQuery(inputQuery);

  renderNoteList(refs.list, foundNotes);
};

renderNoteList(refs.list, notepad.notes);

// Listeners
refs.noteEditor.addEventListener('submit', handleNoteEditorSubmit);
refs.notesList.addEventListener('click', handleRemoveNote);
refs.searchNotesByQuery.addEventListener('input', handleSearchNotesByQuery);
