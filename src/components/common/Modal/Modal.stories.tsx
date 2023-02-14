import type { ComponentMeta } from "@storybook/react";

import { useModal } from "@/application/hooks";

import { SignUpModal } from "./SignUpModal";

export default {
  title: "components/common/Modal",
  component: SignUpModal,
} as ComponentMeta<typeof SignUpModal>;

export const SignUp = () => {
  const modalProps = useModal();
  return (
    <>
      <button onClick={modalProps.onOpen}>open button</button>
      <SignUpModal {...modalProps} />
    </>
  );
};
