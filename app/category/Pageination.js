"use client";

import style from "@/app/_style/Category.module.css";

export default function Pageination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = [];
  const showDots = totalPages > 3;

  if (currentPage === 1) {
    pageNumbers.push(1, 2);
  } else if (currentPage === totalPages) {
    pageNumbers.push(totalPages - 1, totalPages);
  } else {
    pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
  }

  const uniquePages = [...new Set(pageNumbers)].filter(
    (page) => page >= 1 && page <= totalPages
  );

  return (
    <div className={style.paginationContainer}>
      <button
        className={style.pageButton}
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        قبلی
      </button>

      {uniquePages[0] > 1 && (
        <>
          <button
            className={`${style.pageButton} ${
              currentPage === 1 ? style.activePage : ""
            }`}
            onClick={() => goToPage(1)}
          >
            1
          </button>
          {showDots && uniquePages[0] > 2 && (
            <span className={style.ellipsis}>...</span>
          )}
        </>
      )}

      {uniquePages.map((page) => (
        <button
          key={page}
          className={`${style.pageButton} ${
            currentPage === page ? style.activePage : ""
          }`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      {uniquePages[uniquePages.length - 1] < totalPages && (
        <>
          {showDots && uniquePages[uniquePages.length - 1] < totalPages - 1 && (
            <span className={style.ellipsis}>...</span>
          )}
          <button
            className={`${style.pageButton} ${
              currentPage === totalPages ? style.activePage : ""
            }`}
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className={style.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        بعدی
      </button>
    </div>
  );
}
