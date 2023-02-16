import { useCallback } from "react";

import { useGetMyAccount, useLogout } from "@/application/hooks";
import { api } from "@/infra/api";

export const useAuth = () => {
  const { data, isLoading } = useGetMyAccount();
  const { mutate: logout } = useLogout();

  const login = useCallback((token: string) => {
    api.auth.setAccessToken(token);
  }, []);

  return {
    logout,
    login,
    isLogin: isLoading || Boolean(data),
    user: data,
    isLoading,
  };
};
