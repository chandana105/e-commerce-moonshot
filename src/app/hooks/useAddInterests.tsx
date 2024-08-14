import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import type { Interest } from "@prisma/client";
import useUserData from "./useUserData";
import { errorHandler } from "../utils/helperFunctions";

interface AddInterestsParams {
  userId: number;
  category: Interest;
}

const useAddInterests = ({ userId, category }: AddInterestsParams) => {
  const [checked, setChecked] = useState(false);
  const { getUserCredentials } = useUserData();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const utils = api.useUtils();

  const addInterestMutation = api.user.addUserInterest.useMutation({
    onError: (error) => {
      console.error("Error adding interest:", error);
      errorHandler({
        error,
        setErrorMessage,
        customMessage: `Error adding interest:`,
      });
    },
    onSuccess: async () => {
      await utils.user.invalidate();
    },
  });

  const removeInterestMutation = api.user.removeUserInterest.useMutation({
    onError: (error) => {
      console.error("Error removing interest:", error);
      errorHandler({
        error,
        setErrorMessage,
        customMessage: `Error removing interest:`,
      });
    },
    onSuccess: async () => {
      await utils.user.invalidate();
    },
  });

  // Fetch user data to set initial checkbox state
  const { data: userData, isLoading: userLoading } = getUserCredentials;

  useEffect(() => {
    if (!userLoading && userData) {
      const userInterests = userData.interests.map((interest) => interest.id);
      setChecked(userInterests.includes(category.id));
    }
  }, [userData, userLoading, category.id]);

  const handleChange = () => {
    const newChecked = !checked;

    if (newChecked) {
      addInterestMutation.mutate({ userId, interestId: category.id });
      setChecked(newChecked);
    } else {
      removeInterestMutation.mutate({ userId, interestId: category.id });
      setChecked(newChecked);
    }
  };

  useEffect(() => {
    if (addInterestMutation.isPending || removeInterestMutation.isPending) {
      setLoading(true);
    } else if (
      addInterestMutation.isSuccess ||
      removeInterestMutation.isSuccess
    ) {
      setLoading(false);
    } else if (addInterestMutation.isError || removeInterestMutation.isError) {
      setLoading(false);
    }
  }, [
    addInterestMutation.isPending,
    removeInterestMutation.isPending,
    addInterestMutation.isSuccess,
    removeInterestMutation.isSuccess,
    addInterestMutation.isError,
    removeInterestMutation.isError,
  ]);

  return {
    handleChange,
    loading,
    checked,
    errorMessage,
    addInterestMutation,
    removeInterestMutation,
  };
};

export default useAddInterests;
