import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const createPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let end = Math.min(start + maxPagesToShow - 1, totalPages);

    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <nav
      className="flex flex-col items-center mt-6"
      aria-label="Pagination Navigation"
      role="navigation"
    >
      <p className="mb-2" aria-live="polite">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </p>
      <div className="flex gap-1" role="group" aria-label="Pagination Buttons">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          aria-label="Previous page"
        >
          &laquo;
        </button>

        {createPageNumbers().map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              page === currentPage
                ? "bg-blue-500 text-white font-bold"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
          aria-label="Next page"
        >
          &raquo;
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
