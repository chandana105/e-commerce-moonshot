import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  mockCategories: string[];
  ITEMS_PER_PAGE: number;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  handlePageClick: (event: { selected: number }) => void;
}

const Pagination = ({
  currentPage,
  mockCategories,
  ITEMS_PER_PAGE,
  goToFirstPage,
  goToLastPage,
  handlePageClick,
}: PaginationProps) => {
  return (
    <div className="my-12 mt-16 flex items-center justify-start">
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
        pageCount={Math.ceil(mockCategories.length / ITEMS_PER_PAGE)}
        onPageChange={handlePageClick}
        pageRangeDisplayed={7}
        containerClassName="flex items-center justify-center"
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
          currentPage === Math.ceil(mockCategories.length / ITEMS_PER_PAGE) - 1
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
        disabled={
          currentPage === Math.ceil(mockCategories.length / ITEMS_PER_PAGE) - 1
        }
      >
        <MdOutlineKeyboardDoubleArrowRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;
