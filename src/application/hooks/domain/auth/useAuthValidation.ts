import { useCallback } from "react";

import { useSignUpModalContext } from "@/components/common/Modal";

import { useAuth } from "./useAuth";

type Handler = (...args: any[]) => unknown;
interface ValidatorOptions {
  needSignUpModal: boolean;
}

export const useAuthValidation = () => {
  const { isLogin, user } = useAuth();
  const modalProps = useSignUpModalContext();

  const validate = useCallback(
    <T extends Handler>(handler: T, options: ValidatorOptions = { needSignUpModal: true }) =>
      (...args: Parameters<T>) => {
        if (isLogin) return handler(args) as ReturnType<T>;
        if (!isLogin && options.needSignUpModal) return modalProps.onOpen();
      },
    [isLogin, modalProps],
  );

  return { validate, isLogin, user };
};
