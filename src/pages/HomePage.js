import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NoteList from '../components/NoteList';
import Pagination from '../components/Pagination';
import useLocalStorage from '../hooks/useLocalStorage'; // Import the hook

const HomePage = () => {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="home-page">
      <div className="container">
        <h1 className="title">My Notes</h1>
        <Link to="/note" className="add-note-button">
          Add New Note
        </Link>
        <NoteList notes={currentNotes} onDelete={handleDelete} />
        <Pagination
          totalNotes={notes.length}
          notesPerPage={notesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default HomePage;
