"use client";

import { useState, useRef } from "react";
import {
  checkEmailAndPassword,
  checkSignUpValidations,
} from "../utils/validation";
import { api } from "~/trpc/react";
import { clearFormFields, errorHandler } from "../utils/helpers";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //  mutation hooks for signup and login
  const createUser = api.auth.create.useMutation({
    onSuccess: async () => {
      clearFormFields({
        fullNameRef,
        emailRef,
        passwordRef,
      });
      setErrorMessage("");
    },
    onError: (error) => {
      errorHandler({ error, setErrorMessage });
    },
  });

  const loginUser = api.auth.login.useMutation({
    onSuccess: (data) => {
      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token);
        setErrorMessage("");
        clearFormFields({
          fullNameRef,
          emailRef,
          passwordRef,
        });
        router.push("/");
      } else {
        setErrorMessage(data.message || "Login failed");
      }
    },
    onError: (error) => {
      errorHandler({ error, setErrorMessage });
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

    if (isSignInForm) {
      // Triggering the login mutation
      loginUser.mutate({
        email: emailValue,
        password: passwordValue,
      });
    } else {
      // Triggering the signup mutation
      createUser.mutate({
        name: fullNameValue,
        email: emailValue,
        password: passwordValue,
      });
      // TODO: useRouter for routing to vierfy after createaccount
    }
  };

  // TODO:
  // {createPost.isPending ? "Submitting..." : "Submit"}

  // <button
  // type="submit"
  // className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
  // disabled={createPost.isPending}

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
