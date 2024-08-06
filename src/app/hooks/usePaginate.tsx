import { useState } from "react";
import { mockCategories } from "../utils/constants";

const usePaginate = () => {
  const ITEMS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const goToFirstPage = () => {
    setCurrentPage(0);
  };

  const goToLastPage = () => {
    setCurrentPage(Math.ceil(mockCategories.length / ITEMS_PER_PAGE) - 1);
  };

  const categoriesToDisplay = mockCategories.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );
  return {
    mockCategories,
    currentPage,
    categoriesToDisplay,
    ITEMS_PER_PAGE,
    setCurrentPage,
    handlePageClick,
    goToFirstPage,
    goToLastPage,
  };
};

export default usePaginate;
