import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import type { Interest } from "@prisma/client";
import useUserData from "./useUserData";

interface AddInterestsParams {
  userId: number;
  category: Interest;
}

const useAddInterests = ({ userId, category }: AddInterestsParams) => {
  const [checked, setChecked] = useState(false);
  const { getUserCredentials } = useUserData();
  const utils = api.useUtils();

  const addInterestMutation = api.user.addUserInterest.useMutation({
    onError: (error) => {
      console.error("Error adding interest:", error);
    },
    onSuccess: async () => {
      await utils.user.invalidate();
    },
  });

  const removeInterestMutation = api.user.removeUserInterest.useMutation({
    onError: (error) => {
      console.error("Error removing interest:", error);
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
    setChecked(newChecked);

    if (newChecked) {
      addInterestMutation.mutate({ userId, interestId: category.id });
    } else {
      removeInterestMutation.mutate({ userId, interestId: category.id });
    }
  };

  return { handleChange, checked };
};

export default useAddInterests;
