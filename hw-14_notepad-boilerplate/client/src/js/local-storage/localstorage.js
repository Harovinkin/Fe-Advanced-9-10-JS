import storage from './storage';

export const localStorageMessageSave = ([title, body], Notepad) => {
  const modalTextObj = {
    titleText: title.value,
    bodyText: body.value,
  };

  storage.save(Notepad.LOCAL_STORAGE.MODAL_TEXT_KEY, modalTextObj);
};

export const inputStorageSavedModalText = ({ titleText, bodyText }, refs) => {
  const [title, body] = refs.noteEditor.elements;
  title.value = titleText;
  body.value = bodyText;
};
