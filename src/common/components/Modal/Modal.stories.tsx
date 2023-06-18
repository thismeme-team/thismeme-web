import type { ComponentMeta } from "@storybook/react";

import { SignUpModal, useSignUpModalContext } from "./SignUpModal";

export default {
  title: "components/common/Modal",
  component: SignUpModal,
} as ComponentMeta<typeof SignUpModal>;

export const SignUp = () => {
  const modalProps = useSignUpModalContext();
  return (
    <>
      <button onClick={modalProps.onOpen}>open button</button>
    </>
  );
};
