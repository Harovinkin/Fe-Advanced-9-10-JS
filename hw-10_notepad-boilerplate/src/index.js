import initialNotes from './assets/notes.json';
import Notepad from './js/notepad-model';
import {
  getRefs,
  renderNoteList,
  addListItem,
  findParentListItem,
  removeListItem,
} from './js/view';

import './sass/main.scss';

// Notepad Instance initialization
export const notepad = new Notepad(initialNotes);

// UI Refs
const refs = getRefs();

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
  const btn = target.parentNode;

  if (btn.dataset.action !== 'delete-note') return;

  const btnAction = btn.dataset.action;

  switch (btnAction) {
    case Notepad.NOTE_ACTIONS.DELETE:
      const listItem = findParentListItem(btn);

      const listItemId = listItem.dataset.id;

      notepad.deleteNote(listItemId);

      removeListItem(listItem);
      break;

    case Notepad.NOTE_ACTIONS.EDIT:
      // My code
      break;
  }
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

// Render Initial Notes
renderNoteList(refs.list, notepad.notes);

// Listeners
refs.noteEditor.addEventListener('submit', handleNoteEditorSubmit);
refs.notesList.addEventListener('click', handleRemoveNote);
refs.searchNotesByQuery.addEventListener('input', handleSearchNotesByQuery);
