"use client";

import {
  VERFIY_BUTTON_TEXT,
  VERFIY_HEADING,
  VERIFY_YOUR_EMAIL,
} from "~/app/utils/constants";
import VerfiyCodeInput from "~/app/_components/verfiyCodeInput";

const AuthVerfiy = () => {
  return (
    <div className="relative">
      <form
        noValidate
        onSubmit={(e) => e.preventDefault()}
        className="absolute left-0 right-0 m-8 mx-auto w-[38%] rounded-[20px] border-app-border border-login-border bg-white px-14 py-8 text-black"
      >
        <h1 className="mb-8 text-center text-heading font-semibold leading-heading-line-height text-black">
          {VERIFY_YOUR_EMAIL}
        </h1>
        <p className="mb-5 flex flex-col text-center text-base leading-text-line-height tracking-wider text-black">
          <span className="font-normal">
            {VERFIY_HEADING}
            <span className="font-medium">swa***@gmail.com</span>
          </span>
        </p>

        <div className="my-8 flex flex-col py-4">
          <h3 className="mb-2 text-left text-base font-normal leading-text-line-height text-black">
            Code
          </h3>

          <div className="flex flex-row gap-[13px]">
            {Array.from({ length: 8 }, (_, index) => (
              <VerfiyCodeInput
                key={index}
                id={`code-${index + 1}`}
                nextId={`code-${index + 2}`}
                prevId={index === 0 ? undefined : `code-${index}`}
                label={`${index + 1} code`}
              />
            ))}
          </div>
        </div>

        <button className="app-button" id="verfiy-submit">
          {VERFIY_BUTTON_TEXT}
        </button>
      </form>
    </div>
  );
};

export default AuthVerfiy;
