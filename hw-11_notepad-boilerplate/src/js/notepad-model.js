import {
  PRIORITY_TYPES,
  ICON_TYPES,
  NOTE_ACTIONS,
  PRIORITIES,
  NOTIFICATION_MESSAGES,
} from './utils/constants';

// Конструктор Notepad при инициализации принимает массив заметок

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
      note.id === id ? { ...note, ...updatedContent } : note,
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
      note.id === id ? { ...note, priority: priority } : note,
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
