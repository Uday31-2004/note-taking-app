
import React from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h3 className="text-xl font-bold">{note.title}</h3>
      <p className="text-gray-700">{note.content}</p>
      <small className="block text-gray-500">{new Date(note.timestamp).toLocaleString()}</small>
      <div className="mt-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
          onClick={() => onEdit(note.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
