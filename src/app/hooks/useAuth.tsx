"use client";

import { useState, useRef } from "react";
import {
  checkEmailAndPassword,
  checkSignUpValidations,
} from "../utils/validation";
import { api } from "~/trpc/react";
import { TRPCClientError } from "@trpc/client";

const useAuth = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Define the mutation hook here
  const createUser = api.user.create.useMutation({
    onSuccess: async () => {
      // Clear form fields upon successful user creation
      if (fullNameRef.current) {
        fullNameRef.current.value = "";
      }
      if (emailRef.current) {
        emailRef.current.value = "";
      }
      if (passwordRef.current) {
        passwordRef.current.value = "";
      }
      setErrorMessage(""); // Clear error message on success
    },
    onError: (error) => {
      // Handle error from server
      if (error instanceof Error) {
        setErrorMessage(error.message); // Set error message if it’s a standard Error
      } else if (error instanceof TRPCClientError) {
        // TRPC specific error handling
        setErrorMessage(error.message || "An unexpected error occurred.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    },
  });

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

    if (message) return; // If there is any validation error, do not proceed further

    console.log("signup");

    if (!isSignInForm) {
      // Triggering the mutation with the form data
      // signup
      createUser.mutate({
        name: fullNameValue,
        email: emailValue,
        password: passwordValue,
      });
    }
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
