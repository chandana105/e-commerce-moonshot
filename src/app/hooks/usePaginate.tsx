import { useEffect, useState } from "react";
import useUserData from "./useUserData";
import type { Interest } from "@prisma/client";

const usePaginate = () => {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState<Interest[]>([]);
  const { getCategoriesToDisplay } = useUserData();

  const { data, isLoading } = getCategoriesToDisplay;

  useEffect(() => {
    if (!isLoading && data) {
      setCategories(data);
    }
  }, [data, isLoading]);

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
