import { useState } from "react";
import useUserData from "./useUserData";

const usePaginate = () => {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const { getCategoriesToDisplay } = useUserData();

  const { data: categories = [], isLoading } = getCategoriesToDisplay;

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const goToFirstPage = () => {
    setCurrentPage(0);
  };

  const goToLastPage = () => {
    if (categories.length) {
      setCurrentPage(Math.ceil(categories.length / ITEMS_PER_PAGE) - 1);
    }
  };

  const categoriesToDisplay = categories.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  return {
    categories,
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
