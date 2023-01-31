import { useCallback, useEffect, useState } from "react";

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
  const [isLogin, setIsLogin] = useState(false);

  const logout = useCallback(() => api.auth.logout().then(() => setIsLogin(false)), []);
  const login = useCallback((token: string) => {
    api.auth.setAccessToken(token);
    setIsLogin(true);

    /**
     * @todo
     *   request getUserInfo API
     *   set user context
     */
  }, []);

  useEffect(() => {
    setIsLogin(Boolean(api.auth.getAccessToken()));
  }, []);

  return {
    logout,
    login,
    isLogin,
    user: null,
  };
};
