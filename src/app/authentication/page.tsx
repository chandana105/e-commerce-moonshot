"use client";

import useAuth from "../hooks/useAuth";
import {
  ALREADY_REGISTERED,
  CREATE_ACCOUNT_BUTTON_TEXT,
  LOGIN,
  LOGIN_WELCOME_MESSAGE,
  NEW_ACCOUNT,
  SHOW_PASSWORD,
  SIGN_IN_BUTTON_TEXT,
  SIGN_UP,
  SIGN_UP_BUTTON_TEXT,
  WELCOME_BACK_TO_ECOMMERCE,
} from "../utils/constants";

const Authentication = () => {
  const {
    isSignInForm,
    fullNameRef,
    emailRef,
    passwordRef,
    errorMessage,
    showPassword,
    handleButtonClick,
    toggleSignInForm,
    toggleShowPassword,
  } = useAuth();

  return (
    <div className="relative">
      <form
        noValidate
        onSubmit={(e) => e.preventDefault()}
        className="border-login-border border-app-border absolute left-0 right-0 m-8 w-[38%] rounded-[20px] px-14 py-8 text-black md:mx-auto"
      >
        <h1 className="text-heading leading-heading-line-height mb-8 text-center font-semibold">
          {isSignInForm ? SIGN_IN_BUTTON_TEXT : SIGN_UP_BUTTON_TEXT}
        </h1>

        {isSignInForm && (
          <div className="mb-5 flex flex-col items-center gap-3 text-black">
            <h2 className="leading-login-heading-line-height text-2xl font-medium">
              {WELCOME_BACK_TO_ECOMMERCE}
            </h2>
            <h3 className="leading-text-line-height text-base font-normal">
              {LOGIN_WELCOME_MESSAGE}
            </h3>
          </div>
        )}

        {!isSignInForm && (
          <>
            <label className="label">Name</label>
            <input
              ref={fullNameRef}
              type="text"
              placeholder="Enter Name"
              className="input-text placeholder-input-color p-3"
            />
          </>
        )}
        <label className="label">Email</label>
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter Email Address"
          className="input-text placeholder-input-color p-3"
        />

        <label className="label">Password</label>
        {isSignInForm ? (
          <div className="input-text flex">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="placeholder-input-color w-[90%] rounded-l-md p-3"
            />
            <button
              className="leading-text-line-height border-b-app-border mx-3 my-auto h-min border-b-black text-base font-normal text-black"
              onClick={toggleShowPassword}
            >
              {SHOW_PASSWORD}
            </button>
          </div>
        ) : (
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter Password"
            className="input-text placeholder-input-color p-3"
          />
        )}

        <p className="mb-2 text-xs text-red-600 md:text-sm">
          {errorMessage || null}
        </p>

        <button className="app-button" onClick={handleButtonClick}>
          {isSignInForm ? SIGN_IN_BUTTON_TEXT : CREATE_ACCOUNT_BUTTON_TEXT}
        </button>

        {isSignInForm && (
          <div className="bg-login-border mb-2 mt-4 h-[1px] w-full"></div>
        )}
        <p className="leading-text-line-height text-gray-color my-10 text-center text-base font-normal">
          {isSignInForm ? NEW_ACCOUNT : ALREADY_REGISTERED}
          <span
            className="cursor-pointer text-base font-bold uppercase"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? SIGN_UP : LOGIN}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Authentication;
