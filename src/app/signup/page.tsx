"use client";

import {
  ALREADY_REGISTERED,
  CREATE_ACCOUNT_BUTTON_TEXT,
  CREATE_ACCOUNT_BUTTON_TEXT_LOADING,
  getToken,
  LOGIN,
  SIGN_UP_BUTTON_TEXT,
} from "../utils/constants";

import Link from "next/link";
import useSignup from "../hooks/useSignup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CreateAccount = () => {
  const {
    fullNameRef,
    emailRef,
    passwordRef,
    errorMessage,
    createUser,
    handleButtonClick,
  } = useSignup();

  const router = useRouter();

  // Redirect to login if not authenticated in case of browser back button
  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="relative">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute left-0 right-0 m-8 mx-auto w-[90%] rounded-[20px] border-app-border border-login-border bg-white px-14 py-8 text-black md:w-[38%]"
      >
        <h1 className="mb-8 text-center text-heading font-semibold leading-heading-line-height">
          {SIGN_UP_BUTTON_TEXT}
        </h1>

        <label className="label">Name</label>
        <input
          ref={fullNameRef}
          type="text"
          placeholder="Enter Name"
          className="input-text p-3 placeholder-input-color"
        />

        <label className="label">Email</label>
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter Email Address"
          className="input-text p-3 placeholder-input-color"
        />

        <label className="label">Password</label>
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter Password"
          className="input-text p-3 placeholder-input-color"
        />

        {errorMessage && (
          <p className="mb-2 text-sm text-red-600">{errorMessage}</p>
        )}
        <button
          className={`app-button ${createUser.isPending && "app-button-disabled"}`}
          onClick={handleButtonClick}
          disabled={createUser.isPending}
        >
          {createUser.isPending
            ? CREATE_ACCOUNT_BUTTON_TEXT_LOADING
            : CREATE_ACCOUNT_BUTTON_TEXT}
        </button>

        <p className="my-10 text-center text-base font-normal leading-text-line-height text-gray-color">
          {ALREADY_REGISTERED}
          <Link href="/login">
            <span className="cursor-pointer text-base font-bold uppercase hover:underline">
              {LOGIN}
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
