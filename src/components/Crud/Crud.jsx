import './Crud.css';
import { useState, useEffect } from 'react';

const Crud = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch('https://backend-crud-http.onrender.com/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await fetch('https://backend-crud-http.onrender.com/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 0, content })
      });
      if (response.ok) {
        await fetchNotes();
        setContent('');
      } else {
        console.error('Error adding note:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await fetch(`https://backend-crud-http.onrender.com/notes/${id}`, {
        method: 'DELETE'
      });
      await fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleRefreshNotes = async () => {
    try {
      await fetchNotes();
    } catch (error) {
      console.error('Error refreshing notes:', error);
    }
  };

  return (
    <div className='crud-container'>
			<div className='refresh-container'>
				<h1>Notes</h1>
				<button onClick={handleRefreshNotes}>Обновить</button>
			</div>
      <div className='input-container'>
        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <button onClick={handleAddNote}>Добавить</button>
      </div>
      <div className='input-container'>
        {notes.map(note => (
          <div className='note' key={note.id}>
            <p>{note.content}</p>
            <button onClick={() => handleDeleteNote(note.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crud;
