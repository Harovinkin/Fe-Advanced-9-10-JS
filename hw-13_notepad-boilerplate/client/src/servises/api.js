const URL = 'http://localhost:3000/notes';

export const getNotes = () => {
  return fetch(URL).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Error while Fetching: ' + response.statusText);
  });
};

export const saveNote = note => {
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  };

  return fetch(URL, opts).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Error while Fetching: ' + response.statusText);
  });
};

export const deleteNote = id => {
  const opts = {
    method: 'DELETE',
  };

  return fetch(`${URL}/${id}`, opts).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Error while Fetching: ' + response.statusText);
  });
};

export const updateNote = (id, note) => {
  const opts = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  };

  return fetch(`${URL}/${id}`, opts).then(response => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Error while Fetching: ' + response.statusText);
  });
};
