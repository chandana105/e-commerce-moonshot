"use client";

import { useRouter } from "next/navigation";
import {
  ALREADY_REGISTERED,
  CREATE_ACCOUNT_BUTTON_TEXT,
  LOGIN,
  SIGN_UP_BUTTON_TEXT,
} from "../utils/constants";
import { useEffect } from "react";
import useUserData from "../hooks/useUserData";
import Link from "next/link";
import useSignup from "../hooks/useSignup";

const CreateAccount = () => {
  const {
    fullNameRef,
    emailRef,
    passwordRef,
    errorMessage,
    handleButtonClick,
  } = useSignup();

  const { getUserCredentials } = useUserData();
  const { data, status, error, isLoading } = getUserCredentials;
  console.log({ data });
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [isLoading, data, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative">
      <form
        noValidate
        onSubmit={(e) => e.preventDefault()}
        className="absolute left-0 right-0 m-8 mx-auto w-[38%] rounded-[20px] border-app-border border-login-border bg-white px-14 py-8 text-black"
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

        <p className="mb-2 text-sm text-red-600">{errorMessage || null}</p>

        <button className="app-button" onClick={handleButtonClick}>
          {CREATE_ACCOUNT_BUTTON_TEXT}
        </button>

        <p className="my-10 text-center text-base font-normal leading-text-line-height text-gray-color">
          {ALREADY_REGISTERED}
          <Link href="/login">
            <span className="cursor-pointer text-base font-bold uppercase">
              {LOGIN}
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
