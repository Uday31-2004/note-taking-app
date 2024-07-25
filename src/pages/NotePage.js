// src/pages/NotePage.js

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import useLocalStorage from '../hooks/useLocalStorage';

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useLocalStorage('notes', []);
  const note = notes.find((note) => note.id === id);

  const handleSave = (updatedNote) => {
    if (note) {
      const updatedNotes = notes.map((n) =>
        n.id === note.id ? { ...n, ...updatedNote, timestamp: new Date().toISOString() } : n
      );
      setNotes(updatedNotes);
    } else {
      const newNote = {
        id: Date.now().toString(),
        title: updatedNote.title,
        content: updatedNote.content,
        timestamp: new Date().toISOString(),
      };
      setNotes([...notes, newNote]);
    }
    navigate('/');
  };

  return (
    <div className="note-page">
      <div className="container">
        <h1 className="title">{note ? 'Edit Note' : 'Add Note'}</h1>
        <NoteForm note={note} onSave={handleSave} />
      </div>
    </div>
  );
};

export default NotePage;
