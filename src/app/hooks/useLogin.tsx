"use client";

import { useState, useRef } from "react";
import { checkEmailAndPassword } from "../utils/validation";
import { api } from "~/trpc/react";
import { clearFormFields, errorHandler } from "../utils/helperFunctions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Toaster from "../utils/toaster";

const useLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginUser = api.auth.login.useMutation({
    onSuccess: (data) => {
      if (data.success && data.token) {
        // Set token in cookies
        Cookies.set("authToken", data.token, { expires: 1, path: "/" });
        setErrorMessage("");
        clearFormFields({
          emailRef,
          passwordRef,
        });
        router.push("/");
        Toaster({ message: "Login successful", type: "success" });
      } else {
        setErrorMessage(data.message || "Login failed");
        Toaster({ message: "Login failed", type: "error" });
      }
    },

    onError: (error) => {
      errorHandler({ error, setErrorMessage });
      Toaster({ message: "Login failed", type: "error" });
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleButtonClick = () => {
    let message = "";

    const emailValue = emailRef.current?.value ?? "";
    const passwordValue = passwordRef.current?.value ?? "";

    message = checkEmailAndPassword(emailValue, passwordValue);

    setErrorMessage(message);

    if (message) return; // If there is any validation error, do not proceed further

    // Triggering the login mutation
    loginUser.mutate({
      email: emailValue,
      password: passwordValue,
    });
  };

  return {
    emailRef,
    passwordRef,
    errorMessage,
    showPassword,
    loginUser,
    handleButtonClick,
    toggleShowPassword,
  };
};

export default useLogin;
