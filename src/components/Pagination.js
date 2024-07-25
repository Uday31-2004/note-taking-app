
import React from 'react';

const Pagination = ({ totalNotes, notesPerPage, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center my-4">
      <ul className="inline-flex -space-x-px">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-2 border ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} rounded-l`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
