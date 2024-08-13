import type { Interest } from "@prisma/client";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  categories: Interest[];
  ITEMS_PER_PAGE: number;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  handlePageClick: (event: { selected: number }) => void;
}

const Pagination = ({
  currentPage,
  categories,
  ITEMS_PER_PAGE,
  goToFirstPage,
  goToLastPage,
  handlePageClick,
}: PaginationProps) => {
  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  return (
    <div className="my-12 mt-16 flex flex-wrap items-center justify-start">
      {/* First Page Button */}
      <button
        onClick={goToFirstPage}
        className={`py-2 pr-1 ${
          currentPage === 0 ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={currentPage === 0}
      >
        <MdOutlineKeyboardDoubleArrowLeft size={24} />
      </button>

      {/* Pagination Controls */}
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageClick}
        pageRangeDisplayed={7}
        containerClassName="flex items-center justify-center flex-wrap"
        pageClassName="mx-1 text-base"
        pageLinkClassName="px-1 py-2 text-gray-500"
        previousLabel={<MdOutlineKeyboardArrowLeft size={24} />}
        previousClassName="px-1 py-2"
        nextLabel={<MdOutlineKeyboardArrowRight size={24} />}
        nextClassName="px-1 py-2"
        breakClassName="mx-1"
        breakLinkClassName="px-1 py-2 text-gray-500"
        activeClassName="active"
        disabledClassName="opacity-50 cursor-not-allowed"
        forcePage={currentPage}
        renderOnZeroPageCount={null}
      />

      {/* Last Page Button */}
      <button
        onClick={goToLastPage}
        className={`px-1 py-2 ${
          currentPage === Math.ceil(categories.length / ITEMS_PER_PAGE) - 1
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
        disabled={
          currentPage === Math.ceil(categories.length / ITEMS_PER_PAGE) - 1
        }
      >
        <MdOutlineKeyboardDoubleArrowRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;
