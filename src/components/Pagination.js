import React from 'react';

const Pagination = ({ totalPages, setCurrentPage, currentPage }) => {
  return (
    <div className="flex justify-center mt-2">
      <div className="flex space-x-2">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const isActive = currentPage === pageNumber;

          return (
            <button
              key={index}
              onClick={() => setCurrentPage(pageNumber)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-200
                          ${isActive ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-slate-800 hover:text-white'}`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
