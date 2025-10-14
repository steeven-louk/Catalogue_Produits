import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  renderPages: (number | string)[];
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  goToPage,
  renderPages,
  totalPages,
}) => {
  return (
    <div className="flex justify-center items-center gap-2 my-5">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-1 py-1 rounded-full text-sm border border-gray-300 hover:bg-gray-100 transition ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Page précédente"
      >
        <BiChevronLeft />
      </button>
      {renderPages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => goToPage(page)}
            className={`relative px-3 py-1 text-sm ${
              page === currentPage
                ? "primary "
                : " hover:bg-gray-100 text-gray-700"
            }`}
          >
            {page}
            {page === currentPage && (
              <div className="bg-primary w-1 h-1 rounded-full absolute left-3.5"></div>
            )}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-400">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-1 py-1 rounded-full text-sm border border-gray-300 hover:bg-gray-100 transition ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Page suivante"
      >
        <BiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
