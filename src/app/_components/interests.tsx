"use client";

import CustomCheckbox from "./customCheckbox";
import {
  INTERESTS_HEADING,
  INTERESTS_SAVED_HEADING,
  INTERESTS_SUB_HEADING,
} from "../utils/constants";

import Pagination from "./pagination";
import usePaginate from "../hooks/usePaginate";

const Interests = () => {
  const {
    categoriesToDisplay,
    currentPage,
    mockCategories,
    ITEMS_PER_PAGE,
    goToFirstPage,
    goToLastPage,
    handlePageClick,
  } = usePaginate();

  return (
    <div className="relative">
      <form
        noValidate
        onSubmit={(e) => e.preventDefault()}
        className="absolute left-0 right-0 m-8 mx-auto w-[38%] rounded-[20px] border-app-border border-login-border bg-white px-14 py-8 text-black"
      >
        <h1 className="mb-8 text-center text-heading font-semibold leading-heading-line-height text-black">
          {INTERESTS_HEADING}
        </h1>
        <h2 className="text-center text-base font-normal leading-[26px] text-black">
          {INTERESTS_SUB_HEADING}
        </h2>
        <h2 className="py-8 text-xl font-medium leading-[26px] text-black">
          {INTERESTS_SAVED_HEADING}
        </h2>
        <div className="space-y-4">
          {categoriesToDisplay.map((category, index) => (
            <CustomCheckbox key={index} label={category} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          mockCategories={mockCategories}
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
          goToFirstPage={goToFirstPage}
          goToLastPage={goToLastPage}
          handlePageClick={handlePageClick}
        />
      </form>
    </div>
  );
};

export default Interests;
