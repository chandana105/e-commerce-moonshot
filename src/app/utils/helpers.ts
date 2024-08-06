import { TRPCClientError } from "@trpc/client";
import type { RefObject } from "react";

interface ErrorHandlerParams {
  error: unknown;
  setErrorMessage: (message: string) => void;
}

interface ClearFormFieldsParams {
  fullNameRef?: RefObject<HTMLInputElement>;
  emailRef?: RefObject<HTMLInputElement>;
  passwordRef?: RefObject<HTMLInputElement>;
}

export const errorHandler = ({
  error,
  setErrorMessage,
}: ErrorHandlerParams) => {
  if (error instanceof Error) {
    setErrorMessage(error.message);
  } else if (error instanceof TRPCClientError) {
    setErrorMessage(error.message || "An unexpected error occurred.");
  } else {
    setErrorMessage("An unexpected error occurred.");
  }
};

export const clearFormFields = ({
  fullNameRef,
  emailRef,
  passwordRef,
}: ClearFormFieldsParams) => {
  if (fullNameRef?.current) {
    fullNameRef.current.value = ""; //TODO: NULL ?
  }
  if (emailRef?.current) {
    emailRef.current.value = "";
  }
  if (passwordRef?.current) {
    passwordRef.current.value = "";
  }
};
