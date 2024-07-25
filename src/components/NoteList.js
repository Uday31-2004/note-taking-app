import React from 'react';
import { Link } from 'react-router-dom';

const NoteList = ({ notes, onDelete }) => {
  return (
    <div className="note-list">
      {notes.length === 0 ? (
        <div className="no-notes">No notes found</div>
      ) : (
        <ul className="note-items">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <h2 className="note-title">{note.title}</h2>
              <p className="note-content">{note.content}</p>
              <p className="note-timestamp">{new Date(note.timestamp).toLocaleString()}</p>
              <div className="note-actions">
                <Link to={`/edit/${note.id}`} className="edit-button">Edit</Link>
                <button className="delete-button" onClick={() => onDelete(note.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;
