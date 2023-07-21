import { useCallback } from "react";

import { useGetMyAccount, useLogout } from "@/api/account";
import { api } from "@/api/core";
import { useSignUpModalContext } from "@/common/components/Modal";

type Handler = (...args: any[]) => unknown;
interface ValidatorOptions {
  needSignUpModal: boolean;
}

export const useAuth = () => {
  const { data, isLoading } = useGetMyAccount();
  const { mutate: logout } = useLogout();
  const isLogin = Boolean(data);
  const modalProps = useSignUpModalContext();

  const login = useCallback((token: string) => {
    api.auth.setAccessToken(token);
  }, []);

  const validate = useCallback(
    <T extends Handler>(handler?: T, options: ValidatorOptions = { needSignUpModal: true }) =>
      (...args: Parameters<T>) => {
        if (isLogin) return handler?.(args) as ReturnType<T>;
        if (!isLogin && options.needSignUpModal) return modalProps.onOpen();
      },
    [isLogin, modalProps],
  );

  return {
    logout,
    login,
    isLogin,
    user: data,
    isLoading,
    validate,
  };
};
