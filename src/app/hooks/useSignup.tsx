"use client";

import { useState, useRef } from "react";
import { checkSignUpValidations } from "../utils/validation";
import { api } from "~/trpc/react";
import { clearFormFields, errorHandler } from "../utils/helperFunctions";
import { useRouter } from "next/navigation";
import { useEmailContext } from "../context/EmailContext";
import Cookies from "js-cookie";
import Toaster from "../utils/toaster";

const useSignup = () => {
  const { setEmailToBeVerified } = useEmailContext();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //  mutation hooks for signup
  const createUser = api.auth.create.useMutation({
    onSuccess: async (response) => {
      if (response.success) {
        clearFormFields({
          fullNameRef,
          emailRef,
          passwordRef,
        });
        if (response?.tempUser?.email) {
          setEmailToBeVerified(response.tempUser.email);
        }
        // Set the cookie to indicate that OTP is set
        Cookies.set("isOtpSet", "yes", { expires: 15 / 1440, path: "/" });
        setErrorMessage("");
        router.push("/verify");
        Toaster({ message: "Signup successful", type: "success" });
      } else {
        setErrorMessage(response.message || "Create user account failed");
        Toaster({ message: "Signup failed", type: "error" });
      }
    },
    onError: (error) => {
      errorHandler({ error, setErrorMessage });
      Toaster({ message: "Signup failed", type: "error" });
    },
  });

  const handleButtonClick = () => {
    let message = "";

    const emailValue = emailRef.current?.value ?? "";
    const passwordValue = passwordRef.current?.value ?? "";
    const fullNameValue = fullNameRef.current?.value ?? "";

    message = checkSignUpValidations(fullNameValue, emailValue, passwordValue);

    setErrorMessage(message);

    if (message) return; // If there is any validation error, do not proceed further

    // Triggering the signup mutation
    createUser.mutate({
      name: fullNameValue,
      email: emailValue,
      password: passwordValue,
    });
  };

  return {
    fullNameRef,
    emailRef,
    passwordRef,
    errorMessage,
    createUser,
    handleButtonClick,
  };
};

export default useSignup;
