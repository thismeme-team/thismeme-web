import type { PropsWithChildren } from "react";
import { cloneElement, isValidElement } from "react";

import { useAuth, useModal } from "@/application/hooks";
import { SignUpModal } from "@/components/common/Modal";

interface Props {
  handler: string[];
}

export const AuthValidateHandler = ({ children, handler }: PropsWithChildren<Props>) => {
  const { isLogin } = useAuth();
  const modalProps = useModal();

  const handlerProps = handler.reduce((acc, cur) => {
    const originHandler = isValidElement(children) && children.props[cur];
    const validateHandler = (...args: unknown[]) => {
      if (!isLogin) modalProps.onOpen();
      else originHandler(...args);
    };

    return { ...acc, [cur]: validateHandler };
  }, {});

  return (
    <>
      {isValidElement(children) && cloneElement(children, handlerProps)}
      <SignUpModal {...modalProps} />
    </>
  );
};
