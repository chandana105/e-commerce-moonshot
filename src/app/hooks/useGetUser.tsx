import { api } from "~/trpc/react";

const useGetUser = () => {
  const { data, status, error, isLoading } = api.user.getUserData.useQuery();

  return { data, status, error, isLoading };
};

export default useGetUser;
