"use client";

import type { Interest } from "@prisma/client";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";

interface CustomCheckboxParams {
  category: Interest;
}

const CustomCheckbox = ({ category }: CustomCheckboxParams) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => setChecked(!checked);

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
