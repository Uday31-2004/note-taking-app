
import React, { useState, useEffect } from 'react';

const NoteForm = ({ note, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return; // Basic validation
    onSave({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note content"
          rows="4"
          required
        />
      </div>
      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteForm;
