import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import { errorHandler } from "../utils/helperFunctions";
import { useEmailContext } from "../context/EmailContext";

const useVerifyEmail = () => {
  const [codeValues, setCodeValues] = useState<string[]>(Array(8).fill(""));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { emailToBeVerified } = useEmailContext();

  const verifyEmail = api.auth.verifyEmail.useMutation({
    onSuccess: (response) => {
      if (response.success) {
        // Clear the code fields
        setCodeValues(Array(8).fill(""));

        // Redirect to login page
        router.push("/login");

        // Clear any previous error message
        setErrorMessage("");
      } else {
        // Handle the specific error message from the response
        setErrorMessage(
          response.message || "Verification failed. Please try again.",
        );
      }
    },
    onError: (error) => {
      // Handle the error
      errorHandler({ error, setErrorMessage });
    },
  });

  const handleInputChange = (index: number, value: string) => {
    const newCodeValues = [...codeValues];
    newCodeValues[index] = value;
    setCodeValues(newCodeValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    if (codeValues.some((value) => value.trim() === "")) {
      setErrorMessage("Please fill the code. All fields are required.");
      return;
    }

    // Convert codeValues array to a single number
    const otp = parseInt(codeValues.join(""), 10);

    // Basic validation for OTP
    if (isNaN(otp) || otp.toString().length !== 8) {
      setErrorMessage("Please enter a valid 8-digit OTP.");
      return;
    }

    // Clear previous error messages
    setErrorMessage(null);

    // Call the verification mutation
    if (emailToBeVerified) {
      verifyEmail.mutate({ email: emailToBeVerified, otp });
    }
  };

  return { codeValues, errorMessage, handleInputChange, handleSubmit };
};

export default useVerifyEmail;
