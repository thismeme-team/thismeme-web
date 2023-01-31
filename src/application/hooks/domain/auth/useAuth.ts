import { useCallback } from "react";

import { useLocalStorage } from "@/application/hooks";
import { api } from "@/infra/api";

const ACCESS_TOKEN_KEY = "accessToken";

/**
 * @description
 *
 * useAuth
 * 1. method: login, logout
 * 2. property: user, isLogin
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
  const [token, setToken] = useLocalStorage<string>(ACCESS_TOKEN_KEY, { defaultValue: "" });

  const logout = useCallback(() => api.auth.logout().then(() => setToken("")), [setToken]);
  const login = useCallback(
    (token: string) => {
      setToken(token);

      /**
       * @todo
       *   request getUserInfo API
       *   set user context
       */
    },
    [setToken],
  );

  return {
    logout,
    login,
    isLogin: !!token,
    user: null,
  };
};
