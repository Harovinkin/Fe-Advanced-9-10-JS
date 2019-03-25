export const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

export const PRIORITIES = {
  0: { id: 0, value: 0, name: 'Low' },
  1: { id: 1, value: 1, name: 'Normal' },
  2: { id: 2, value: 2, name: 'High' },
};

export const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

export const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

export const NOTIFICATION_MESSAGES = {
  NOTE_DELETED_SUCCESS: 'Заметка успешно удалена',
  NOTE_ADDED_SUCCESS: 'Заметка успешно добавлена 🎉',
  NOTES_ARE_NOT: 'У Вас нет сохранённых заметок',
  EDITOR_FIELDS_EMPTY: 'Заполните поля редактора',
};

export const LOCAL_STORAGE = {
  MODAL_TEXT_KEY: 'modal-note-text',
};
