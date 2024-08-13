import { useEffect } from "react";
import { toast } from "react-toastify";

const useErrorHandling = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get("error");

      if (error) {
        switch (error) {
          case "Unauthorized":
            toast.error("You need to log in.");
            break;
          case "Verification required":
            toast.error("You need to verify your email.");
            break;
          case "Already logged in":
            toast.error("You are already logged in.");
            break;
          default:
            toast.error("An unknown error occurred.");
        }

        // Delaying the removal of the query parameter to ensure the message is shown
        setTimeout(() => {
          urlParams.delete("error");
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?${urlParams.toString()}`,
          );
        }, 1000);
      }
    }
  }, []);

  return null;
};

export default useErrorHandling;
