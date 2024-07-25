import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NoteList from '../components/NoteList';
import Pagination from '../components/Pagination';
import useLocalStorage from '../hooks/useLocalStorage'; // Ensure this hook is imported

const HomePage = () => {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const notesPerPage = 10;

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const filteredNotes = currentNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <i className="fas fa-search search-icon"></i>
        </div>
        <NoteList notes={filteredNotes} onDelete={handleDelete} />
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
