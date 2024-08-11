"use client";

import usePaginate from "./hooks/usePaginate";
import {
  INTERESTS_HEADING,
  INTERESTS_SAVED_HEADING,
  INTERESTS_SUB_HEADING,
} from "./utils/constants";
import CustomCheckbox from "./_components/customCheckbox";
import Pagination from "./_components/pagination";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserData from "./hooks/useUserData";

export default function Home() {
  const {
    categoriesToDisplay,
    currentPage,
    categories,
    ITEMS_PER_PAGE,
    goToFirstPage,
    goToLastPage,
    handlePageClick,
  } = usePaginate();

  const { getUserCredentials } = useUserData();

  const { data , error } = getUserCredentials;


  if (error) {
    <p>{error.message}</p>
  }

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
        {data ? (
          <>
            <div className="space-y-4">
              {categoriesToDisplay.map((category, index) => (
                <CustomCheckbox
                  key={index}
                  category={category}
                  userId={data.id}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              categories={categories}
              ITEMS_PER_PAGE={ITEMS_PER_PAGE}
              goToFirstPage={goToFirstPage}
              goToLastPage={goToLastPage}
              handlePageClick={handlePageClick}
            />
          </>
        ) : (
          <p>loading...</p>
        )}
      </form>
    </div>
  );
}
