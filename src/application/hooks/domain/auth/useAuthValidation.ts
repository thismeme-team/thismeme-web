import { useCallback } from "react";

import { useSignUpModalContext } from "@/components/common/Modal";

import { useAuth } from "./useAuth";

type Handler = (...args: any[]) => unknown;

export const useAuthValidation = () => {
  const { isLogin } = useAuth();
  const modalProps = useSignUpModalContext();

  const validatorWithSignUpModal = useCallback(
    <T extends Handler>(handler: T) =>
      (...args: Parameters<T>) => {
        if (!isLogin) modalProps.onOpen();
        else handler(args);
      },
    [isLogin, modalProps],
  );

  const validator = useCallback(
    <T extends Handler>(handler: T) =>
      (...args: Parameters<T>) => {
        if (isLogin) handler(args);
      },
    [isLogin],
  );

  return { validatorWithSignUpModal, validator };
};
