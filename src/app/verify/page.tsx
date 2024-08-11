"use client";

import {
  VERIFY_BUTTON_TEXT,
  VERIFY_BUTTON_TEXT_LOADING,
  VERIFY_HEADING,
  VERIFY_YOUR_EMAIL,
} from "~/app/utils/constants";
import VerifyCodeInput from "~/app/_components/verifyCodeInput";
import useVerifyEmail from "../hooks/useVerifyEmail";
import { useEmailContext } from "../context/EmailContext";

const AuthVerify = () => {
  const {
    codeValues,
    errorMessage,
    verifyEmail,
    handleInputChange,
    handleSubmit,
  } = useVerifyEmail();

  const { emailToBeVerified } = useEmailContext(); //TODO: HERE

  return (
    <div className="relative">
      <form
        noValidate
        onSubmit={(e) => {
          // handleSubmit;
          e.preventDefault();
        }}
        className="absolute left-0 right-0 m-8 mx-auto w-[38%] rounded-[20px] border-app-border border-login-border bg-white px-14 py-8 text-black"
      >
        <h1 className="mb-8 text-center text-heading font-semibold leading-heading-line-height text-black">
          {VERIFY_YOUR_EMAIL}
        </h1>
        <p className="mb-5 flex flex-col text-center text-base leading-text-line-height tracking-wider text-black">
          <span className="font-normal">
            {VERIFY_HEADING}
            <span className="font-medium">{emailToBeVerified}</span>
          </span>
        </p>

        <div className="my-8 flex flex-col py-4">
          <h3 className="mb-2 text-left text-base font-normal leading-text-line-height text-black">
            Code
          </h3>

          <div className="flex flex-row gap-[13px]">
            {Array.from({ length: 8 }, (_, index) => (
              <VerifyCodeInput
                key={index}
                id={`code-${index + 1}`}
                nextId={index === 7 ? undefined : `code-${index + 2}`}
                prevId={index === 0 ? undefined : `code-${index}`}
                label={`${index + 1} code`}
                value={codeValues[index] ?? ""}
                onChange={(value) => handleInputChange(index, value)}
              />
            ))}
          </div>
          {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
        </div>

        <button
          className={`app-button ${verifyEmail.isPending && "app-button-disabled"}`}
          id="verify-submit"
          disabled={verifyEmail.isPending}
          onClick={handleSubmit}
        >
          {verifyEmail.isPending
            ? VERIFY_BUTTON_TEXT_LOADING
            : VERIFY_BUTTON_TEXT}
        </button>
      </form>
    </div>
  );
};

export default AuthVerify;
