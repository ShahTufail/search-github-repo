import React from "react";
import styles from "../styles/Pagination.module.scss";

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
    <div className={styles.paginationContainer}>
      <p>
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </p>
      <div className={styles.pageButtons}>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
          &laquo;
        </button>

        {createPageNumbers().map((page) => (
          <button
            key={page}
            className={page === currentPage ? styles.active : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
