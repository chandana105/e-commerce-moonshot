"use client";

import { useState, useRef } from "react";
import { checkEmailAndPassword } from "../utils/validation";
import { api } from "~/trpc/react";
import { clearFormFields, errorHandler } from "../utils/helperFunctions";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginUser = api.auth.login.useMutation({
    onSuccess: (data) => {
      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token);
        setErrorMessage("");
        clearFormFields({
          emailRef,
          passwordRef,
        });
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    },

    onError: (error) => {
      errorHandler({ error, setErrorMessage });
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

  // TODO:
  // {createPost.isPending ? "Submitting..." : "Submit"}

  // <button
  // type="submit"
  // className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
  // disabled={createPost.isPending}

  return {
    emailRef,
    passwordRef,
    errorMessage,
    showPassword,
    handleButtonClick,
    toggleShowPassword,
    loginUser,
  };
};

export default useAuth;
