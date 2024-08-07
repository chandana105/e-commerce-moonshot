"use client";

import type { Interest } from "@prisma/client";
import { FiCheck } from "react-icons/fi";
import useAddInterests from "../hooks/useAddInterests";

interface CustomCheckboxParams {
  category: Interest;
  userId: number;
}

const CustomCheckbox = ({ category, userId }: CustomCheckboxParams) => {
  const { handleChange, checked } = useAddInterests({ userId, category });

  return (
    <div className="flex flex-row items-center gap-3" key={category.id}>
      <div
        onClick={handleChange}
        className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded ${
          checked
            ? "border-2 border-black bg-black"
            : "bg-unchecked-checkbox-color"
        }`}
      >
        {checked && <FiCheck className="text-white" size={26} />}
      </div>
      <p className="text-base font-normal leading-[26px] text-black">
        {category.title}
      </p>
    </div>
  );
};

export default CustomCheckbox;
