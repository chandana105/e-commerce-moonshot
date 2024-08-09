"use client";

import { useRouter } from "next/navigation";
import useAuth from "../hooks/useLogin";
import {
  LOGIN_WELCOME_MESSAGE,
  NEW_ACCOUNT,
  SHOW_PASSWORD,
  SIGN_IN_BUTTON_TEXT,
  SIGN_UP,
  WELCOME_BACK_TO_ECOMMERCE,
} from "../utils/constants";
import { useEffect } from "react";
import useUserData from "../hooks/useUserData";
import Link from "next/link";

const Login = () => {
  const {
    emailRef,
    passwordRef,
    errorMessage,
    showPassword,
    handleButtonClick,
    toggleShowPassword,
  } = useAuth();

  const { getUserCredentials } = useUserData();
  const { data, status, error, isLoading } = getUserCredentials;

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
          {SIGN_IN_BUTTON_TEXT}
        </h1>

        <div className="mb-5 flex flex-col items-center gap-3 text-black">
          <h2 className="text-2xl font-medium leading-login-heading-line-height">
            {WELCOME_BACK_TO_ECOMMERCE}
          </h2>
          <h3 className="text-base font-normal leading-text-line-height">
            {LOGIN_WELCOME_MESSAGE}
          </h3>
        </div>

        <label className="label">Email</label>
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter Email Address"
          className="input-text p-3 placeholder-input-color"
        />

        <label className="label">Password</label>

        <div className="input-text flex">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            className="w-[90%] rounded-l-md p-3 placeholder-input-color"
          />
          <button
            className="mx-3 my-auto h-min border-b-app-border border-b-black text-base font-normal leading-text-line-height text-black"
            onClick={toggleShowPassword}
          >
            {SHOW_PASSWORD}
          </button>
        </div>

        <p className="mb-2 text-sm text-red-600">{errorMessage || null}</p>

        <button className="app-button" onClick={handleButtonClick}>
          {SIGN_IN_BUTTON_TEXT}
        </button>

        <div className="mb-2 mt-4 h-[1px] w-full bg-login-border"></div>

        <p className="my-10 text-center text-base font-normal leading-text-line-height text-gray-color">
          {NEW_ACCOUNT}
          <Link href="/signup">
            <span className="cursor-pointer text-base font-bold uppercase">
              {SIGN_UP}
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
