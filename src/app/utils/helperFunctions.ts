import { TRPCClientError } from "@trpc/client";
import type { RefObject } from "react";

interface ErrorHandlerParams {
  error: unknown;
  customMessage?: string;
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
  customMessage = "", // Default to an empty string if not provided
}: ErrorHandlerParams) => {
  let errorMessage = customMessage;

  if (error instanceof Error) {
    errorMessage += ` ${error.message}`;
  } else if (error instanceof TRPCClientError) {
    errorMessage += ` ${error.message || "An unexpected error occurred."}`;
  } else {
    errorMessage += " An unexpected error occurred.";
  }

  setErrorMessage(errorMessage);
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
