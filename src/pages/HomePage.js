import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import NoteList from '../components/NoteList';
import Pagination from '../components/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles.css';

const HomePage = () => {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const notesPerPage = 10;

  useEffect(() => {
    // Sort notes by timestamp in descending order once on component mount
    const sortedNotes = [...notes].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setNotes(sortedNotes);
  }, []);

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    
    const sortedUpdatedNotes = [...updatedNotes].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setNotes(sortedUpdatedNotes);
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

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
          <FiSearch className="search-icon" />
        </div>
        <NoteList notes={currentNotes} onDelete={handleDelete} />
        <Pagination
          totalNotes={filteredNotes.length}
          notesPerPage={notesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default HomePage;
