"use client";

import type { Interest } from "@prisma/client";
import { FiCheck } from "react-icons/fi";
import useAddInterests from "../hooks/useAddInterests";
import ClipLoader from "react-spinners/ClipLoader";

interface CustomCheckboxParams {
  category: Interest;
  userId: number;
}

const CustomCheckbox = ({ category, userId }: CustomCheckboxParams) => {
  const { handleChange, checked, errorMessage, loading } = useAddInterests({
    userId,
    category,
  });

  return (
    <div className="flex flex-row items-center gap-3" key={category.id}>
      <div
        onClick={handleChange}
        className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded ${loading && "cursor-not-allowed"} ${
          checked && !loading
            ? "border-2 border-black bg-black"
            : "bg-unchecked-checkbox-color"
        }`}
      >
        {loading ? (
          <ClipLoader
            color={"black"}
            loading={true}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          checked && !loading && <FiCheck className="text-white" size={26} />
        )}
      </div>
      <p className="text-base font-normal leading-[26px] text-black">
        {category.title}
      </p>
      <p className="text-sm text-red-600">{errorMessage && errorMessage}</p>
    </div>
  );
};

export default CustomCheckbox;
