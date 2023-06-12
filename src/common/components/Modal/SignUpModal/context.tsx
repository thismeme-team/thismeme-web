import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

import { useModal } from "@/application/hooks";

import type { ModalProps } from "../types";

type SignUpModalContext = ModalProps;

const SignUpModalContext = createContext<SignUpModalContext>(null as unknown as SignUpModalContext);

export const useSignUpModalContext = () => useContext(SignUpModalContext);

export const SignUpModalProvider = ({ children }: PropsWithChildren) => {
  const modalProps = useModal();

  return <SignUpModalContext.Provider value={modalProps}>{children}</SignUpModalContext.Provider>;
};
