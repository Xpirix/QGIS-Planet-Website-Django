// src/components/Pagination.tsx

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  tags: string[];
  onPageChange: (page: number, tags: string[]) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  tags,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1, tags);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1, tags);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smoothly scroll to the top
  };

  return (
    <nav
      className="pagination is-centered mt-5 mb-5"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className={`pagination-previous button ${
          currentPage === 1 ? "is-disabled" : ""
        }`}
        onClick={() => {
          handlePrevious();
          scrollToTop();
        }}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className={`pagination-next button ${
          currentPage === totalPages ? "is-disabled" : ""
        }`}
        onClick={() => {
            handleNext();
            scrollToTop();
        }}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <ul className="pagination-list">
        <li>
          <span
            className="pagination-link"
            aria-label="Page {currentPage} of {totalPages}"
          >
            Page {currentPage} of {totalPages}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
