import type { ComponentMeta } from "@storybook/react";

import { SignUpModal } from "./SignUpModal";

export default {
  title: "components/common/Modal",
  component: SignUpModal,
} as ComponentMeta<typeof SignUpModal>;

export const SignUp = () => {
  return (
    <>
      <SignUpModal onClose={() => {}} />
    </>
  );
};
