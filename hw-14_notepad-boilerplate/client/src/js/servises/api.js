import axios from 'axios';
import { async } from 'q';

axios.defaults.baseURL = 'http://localhost:3000/';

export const getNotes = async () => {
  try {
    const response = await axios.get('notes');
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const saveNote = async note => {
  try {
    const savedNote = await axios.post('notes', note);

    return savedNote.data;
  } catch (err) {
    throw err;
  }
};

export const deleteNote = async id => {
  try {
    await axios.delete(`notes/${id}`);

    return id;
  } catch (err) {
    throw err;
  }
};

export const updateNote = async (id, textFields) => {
  try {
    const response = await axios.putch(`note/${id}`, textFields);

    return response.date;
  } catch (err) {
    throw err;
  }
};
