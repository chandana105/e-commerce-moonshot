import { api } from "~/trpc/react";

const useUserData = () => {
  const getUserCredentials = api.user.getUserData.useQuery();

  const getCategoriesToDisplay = api.user.getAllCategories.useQuery();

  return { getUserCredentials, getCategoriesToDisplay };
};

export default useUserData;
