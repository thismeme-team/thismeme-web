import type { PropsWithChildren } from "react";
import { Children, cloneElement, isValidElement } from "react";

import { useAuth, useModal } from "@/application/hooks";
import { SignUpModal } from "@/components/common/Modal";

interface Props {
  handlers: string[];
}

export const WithAuthHandlers = ({ children, handlers }: PropsWithChildren<Props>) => {
  const { isLogin } = useAuth();
  const modalProps = useModal();

  const child = Children.only(children);
  if (!isValidElement(child)) {
    return <>{child}</>;
  }

  const handlerProps = handlers.reduce((acc, cur) => {
    const originHandler = child.props[cur];
    const validateHandler = (...args: unknown[]) => {
      if (!isLogin) modalProps.onOpen();
      else originHandler(...args);
    };

    return { ...acc, [cur]: validateHandler };
  }, {});

  return (
    <>
      {cloneElement(child, handlerProps)}
      <SignUpModal {...modalProps} />
    </>
  );
};
