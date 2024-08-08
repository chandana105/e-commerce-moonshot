"use client";

import { useState, useRef } from "react";
import { checkSignUpValidations } from "../utils/validation";
import { api } from "~/trpc/react";
import { clearFormFields, errorHandler } from "../utils/helperFunctions";
import { useRouter } from "next/navigation";

const useSignup = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //  mutation hooks for signup
  const createUser = api.auth.create.useMutation({
    onSuccess: async () => {
      clearFormFields({
        fullNameRef,
        emailRef,
        passwordRef,
      });
      router.push("/verfiy");
      setErrorMessage("");
    },
    onError: (error) => {
      errorHandler({ error, setErrorMessage });
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

  // TODO:
  // {createPost.isPending ? "Submitting..." : "Submit"}

  // <button
  // type="submit"
  // className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
  // disabled={createPost.isPending}

  return {
    fullNameRef,
    emailRef,
    passwordRef,
    errorMessage,
    handleButtonClick,
  };
};

export default useSignup;
