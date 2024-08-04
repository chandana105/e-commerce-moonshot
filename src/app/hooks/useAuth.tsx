"use client";

import { useRef, useState } from "react";
import {
  checkEmailAndPassword,
  checkSignUpValidations,
} from "../utils/validation";

const useAuth = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const toggleSignInForm = () => {
    setIsSignInForm((prev) => !prev);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleButtonClick = () => {
    let message = "";

    const emailValue = emailRef.current?.value ?? "";
    const passwordValue = passwordRef.current?.value ?? "";
    const fullNameValue = fullNameRef.current?.value ?? "";

    if (isSignInForm) {
      message = checkEmailAndPassword(emailValue, passwordValue);
    } else {
      message = checkSignUpValidations(
        fullNameValue,
        emailValue,
        passwordValue,
      );
    }

    setErrorMessage(message);

    if (message) return; //if there is any validation error then do not proceed further
    console.log("logging in");
    // Sign in / Sign up

    // if (!isSignInForm) {
    // logic for sending user to db
    // }
  };

  return {
    isSignInForm,
    fullNameRef,
    emailRef,
    passwordRef,
    errorMessage,
    showPassword,
    handleButtonClick,
    toggleSignInForm,
    toggleShowPassword,
  };
};

export default useAuth;
