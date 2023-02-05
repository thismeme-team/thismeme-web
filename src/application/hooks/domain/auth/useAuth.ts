import { useCallback } from "react";

import { useGetMyAccount, useLocalStorage } from "@/application/hooks";
import { LOCAL_STORAGE_KEY } from "@/application/util";
import { api } from "@/infra/api";

/**
 * @description
 *
 * useAuth
 * 1. method: login, logout
 * 2. property: user, isLogin (SSR false)
 *
 * withAuth hoc
 *   useAuth isLogin == false, return LoginModal
 *
 * getServerSideProps (로그인 모달로 처리하므로 쓸일 없을 듯)
 *   check req.header.authorization
 *   if AT not exist, return redirect to auth page
 *   else return props user data
 *
 */

export const useAuth = () => {
  const [isLogin, setIsLogin] = useLocalStorage<boolean>(LOCAL_STORAGE_KEY.isLogin, {
    defaultValue: false,
  });
  const { data } = useGetMyAccount({ enabled: isLogin });

  const logout = useCallback(() => api.auth.logout().then(() => setIsLogin(false)), [setIsLogin]);
  const login = useCallback(
    (token: string) => {
      api.auth.setAccessToken(token);
      setIsLogin(true);
    },
    [setIsLogin],
  );

  return {
    logout,
    login,
    isLogin,
    user: data,
  };
};
