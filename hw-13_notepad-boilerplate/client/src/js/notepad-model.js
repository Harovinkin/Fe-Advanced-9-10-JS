import * as api from './servises/api';

import {
  PRIORITY_TYPES,
  ICON_TYPES,
  NOTE_ACTIONS,
  PRIORITIES,
  NOTIFICATION_MESSAGES,
  LOCAL_STORAGE,
} from './utils/constants';

//  Model
export default class Notepad {
  // Карта приоритетов.
  static PRIORITY_TYPES = PRIORITY_TYPES;
  static PRIORITIES = PRIORITIES;

  // Карта действий над заметками для подстановки констант
  static NOTE_ACTIONS = NOTE_ACTIONS;

  // Карта имен иконок
  static ICON_TYPES = ICON_TYPES;

  // Карта текста нотификаций
  static NOTIFICATION_MESSAGES = NOTIFICATION_MESSAGES;

  // Карта приоритетов ключей для Local Storage
  static LOCAL_STORAGE = LOCAL_STORAGE;

  static getPriorityName(priorityId) {
    /*
     * Получает: идентификатор приоритета
     * Возвращает: значение поля name из карты приоритетов.
     */
    return this.PRIORITIES[priorityId].name;
  }

  constructor() {
    this._notes = [];
  }

  get getNotes() {
    /*
     * Принимает: ничего
     * Возвращает: все заметки, значение свойства notes
     */
    return api.getNotes().then(notes => {
      this._notes = notes;

      return this._notes;
    });
  }

  saveNote(title, body) {
    /*
     * Сохраняет заметку в массив notes
     *
     * Принимает: объект заметки
     * Возвращает: сохраненную заметку
     */
    const note = {
      title,
      body,
      priority: Notepad.PRIORITY_TYPES.LOW,
    };

    return api.saveNote(note).then(savedNote => {
      this._notes.push(savedNote);

      return savedNote;
    });
  }

  deleteNote(id) {
    /*
     * Удаляет заметку по идентификатору из массива notes
     *
     * Принимает: идентификатор заметки
     * Возвращает: ничего
     */

    return api.deleteNote(id).then(() => {
      this._notes = this._notes.filter(note => note.id !== id);
    });
  }

  updateNoteContent(id, { title, body }) {
    /*
     * Обновляет контент заметки
     * updatedContent - объект с полями вида {имя: значение, имя: значение}
     * Свойств в объекте updatedContent может быть произвольное количество
     *
     * Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
     * Возвращает: обновленную заметку
     */
    const note = {
      title,
      body,
    };

    return api.updateNote(id, note).then(updatedNote => {
      this._notes.map(note =>
        note.id === updatedNote.id ? updatedNote.id : note,
      );

      return updatedNote;
    });
  }

  updateNotePriority(id, priority) {
    /*
     * Обновляет приоритет заметки
     *
     * Принимает: идентификатор заметки и ее новый приоритет
     * Возвращает: обновленную заметку
     */
    const note = {
      priority,
    };

    return api.updateNote(id, note).then(updatedPriority => {
      this._notes.map(note =>
        note.id === updatedPriority.id ? updatedPriority.id : note,
      );

      return updatedPriority;
    });
  }

  filterNotesByQuery(query = '') {
    /*
     * Фильтрует массив заметок по подстроке query.
     * Если значение query есть в заголовке или теле заметки - она подходит
     *
     * Принимает: подстроку для поиска в title и body заметки
     * Возвращает: новый массив заметок, контент которых содержит подстроку
     */
    return new Promise(resolve => {
      resolve(
        this._notes.filter(note => {
          const noteContent = `${note.title} ${note.body}`;
          const hasQuery = noteContent
            .toLowerCase()
            .includes(query.toLowerCase());

          if (hasQuery) {
            return note;
          }
        }),
      );
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
    return new Promise(resolve => {
      resolve(this._notes.filter(note => note.priority === priority));
    });
  }
}
