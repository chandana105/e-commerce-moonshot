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
  customMessage = "",
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
    fullNameRef.current.value = "";
  }
  if (emailRef?.current) {
    emailRef.current.value = "";
  }
  if (passwordRef?.current) {
    passwordRef.current.value = "";
  }
};

export const maskEmail = (email: string): string => {
  const parts = email.split("@");
  if (parts.length !== 2) return email; // Return the original email if it's not in the correct format

  const [localPart, domain] = parts;
  if (!localPart || !domain) return email; // Checking if localPart or domain are undefined

  const maskedLocalPart = localPart.slice(0, 3) + "***"; // Mask part of the local part
  return `${maskedLocalPart}@${domain}`;
};
