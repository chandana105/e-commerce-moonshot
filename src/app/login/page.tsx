"use client";

import { useRouter } from "next/navigation";
import useLogin from "../hooks/useLogin";
import {
  getToken,
  LOGIN_WELCOME_MESSAGE,
  NEW_ACCOUNT,
  SHOW_PASSWORD,
  SIGN_IN_BUTTON_TEXT,
  SIGN_IN_BUTTON_TEXT_LOADING,
  SIGN_UP,
  WELCOME_BACK_TO_ECOMMERCE,
} from "../utils/constants";
import Link from "next/link";
import { useEffect } from "react";

const Login = () => {
  const {
    emailRef,
    passwordRef,
    errorMessage,
    showPassword,
    loginUser,
    handleButtonClick,
    toggleShowPassword,
  } = useLogin();

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

        {errorMessage && (
          <p className="mb-2 text-sm text-red-600">{errorMessage}</p>
        )}

        <button
          className={`app-button ${loginUser.isPending && "app-button-disabled"}`}
          onClick={handleButtonClick}
          disabled={loginUser.isPending}
        >
          {loginUser.isPending
            ? SIGN_IN_BUTTON_TEXT_LOADING
            : SIGN_IN_BUTTON_TEXT}
        </button>

        <div className="mb-2 mt-4 h-[1px] w-full bg-login-border"></div>

        <p className="my-10 text-center text-base font-normal leading-text-line-height text-gray-color">
          {NEW_ACCOUNT}
          <Link href="/signup">
            <span className="cursor-pointer text-base font-bold uppercase hover:underline">
              {SIGN_UP}
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
