import { redirect, useRouter } from "next/navigation";
import useUserData from "./useUserData";
import { useEffect, useState } from "react";
import { NextResponse } from "next/server";

const useAuth = () => {
  const { getUserCredentials } = useUserData();
  const { data: user, error, isLoading } = getUserCredentials;
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (error ?? !user) {
        router.push("/login");
      } else {
        router.push("/");
      }
      setRedirecting(false); // Stop redirecting once the redirect is done
    }
  }, [isLoading, error, user, router]);

  return { redirecting, user };
};

export default useAuth;


