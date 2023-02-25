import { useCallback } from "react";

import { useGetMyAccount, useLogout } from "@/application/hooks";
import { useSignUpModalContext } from "@/components/common/Modal";
import { api } from "@/infra/api";

type Handler = (...args: any[]) => unknown;
interface ValidatorOptions {
  needSignUpModal: boolean;
}

export const useAuth = () => {
  const { data, isLoading, refetch } = useGetMyAccount();
  const { mutate: logout } = useLogout();
  const isLogin = Boolean(data);
  const modalProps = useSignUpModalContext();

  const login = useCallback((token: string) => {
    api.auth.setAccessToken(token);
  }, []);

  const validate = useCallback(
    <T extends Handler>(handler: T, options: ValidatorOptions = { needSignUpModal: true }) =>
      (...args: Parameters<T>) => {
        if (isLogin) return handler(args) as ReturnType<T>;
        if (!isLogin && options.needSignUpModal) return modalProps.onOpen();
      },
    [isLogin, modalProps],
  );

  return {
    logout,
    login,
    refetch,
    isLogin,
    user: data,
    isLoading,
    validate,
  };
};
