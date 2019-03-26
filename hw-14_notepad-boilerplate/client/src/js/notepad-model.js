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

  async getNotes() {
    /*
     * Принимает: ничего
     * Возвращает: все заметки, значение свойства notes
     */
    try {
      const notes = await api.getNotes();
      this._notes = notes;

      return this._notes;
    } catch (err) {
      throw err;
    }
  }

  async saveNote(title, body) {
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

    try {
      const savedNote = await api.saveNote(note);
      this._notes.push(savedNote);

      return savedNote;
    } catch (err) {
      throw err;
    }
  }

  async deleteNote(id) {
    /*
     * Удаляет заметку по идентификатору из массива notes
     *
     * Принимает: идентификатор заметки
     * Возвращает: ничего
     */
    try {
      const noteId = await api.deleteNote(id);

      this._notes = this._notes.filter(note => note.id !== noteId);

      return this._notes;
    } catch (err) {
      throw err;
    }
  }

  async updateNoteContent(id, textFields) {
    /*
     * Обновляет контент заметки
     * updatedContent - объект с полями вида {имя: значение, имя: значение}
     * Свойств в объекте updatedContent может быть произвольное количество
     *
     * Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
     * Возвращает: обновленную заметку
     */
    try {
      const updatedNote = await api.updateNote(id, textFields);

      this._notes.map(note =>
        note.id === updatedNote.id ? updatedNote.id : note,
      );

      return updatedNote;
    } catch (err) {
      throw err;
    }
  }

  async updateNotePriority(id, priority) {
    /*
     * Обновляет приоритет заметки
     *
     * Принимает: идентификатор заметки и ее новый приоритет
     * Возвращает: обновленную заметку
     */
    try {
      const udatedNotePriority = await api.updateNote(id, priority);

      this._notes.map(note =>
        note.id === udatedNotePriority.id ? udatedNotePriority.id : note,
      );

      return udatedNotePriority;
    } catch (err) {
      throw err;
    }
  }

  getNoteById(id) {
    return this._notes.find(note => note.id === id);
  }

  filterNotesByQuery(query = '') {
    /*
     * Фильтрует массив заметок по подстроке query.
     * Если значение query есть в заголовке или теле заметки - она подходит
     *
     * Принимает: подстроку для поиска в title и body заметки
     * Возвращает: новый массив заметок, контент которых содержит подстроку
     */
    const foundNote = this._notes.filter(note => {
      const noteContent = `${note.title} ${note.body}`;
      const hasQuery = noteContent.toLowerCase().includes(query.toLowerCase());

      if (hasQuery) {
        return note;
      }
    });

    return foundNote;
  }

  filterNotesByPriority(priority) {
    /*
     * Фильтрует массив заметок по значению приоритета
     * Если значение priority совпадаем с приоритетом заметки - она подходит
     *
     * Принимает: приоритет для поиска в свойстве priority заметки
     * Возвращает: новый массив заметок с подходящим приоритетом
     */
    const identicalPriorityNotes = this._notes.filter(
      note => note.priority === priority,
    );

    return identicalPriorityNotes;
  }
}
