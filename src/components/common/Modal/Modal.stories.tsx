import type { ComponentMeta } from "@storybook/react";

import { SampleModal } from "./SampleModal";

export default {
  title: "components/common/Modal",
  component: SampleModal,
} as ComponentMeta<typeof SampleModal>;

export const SignUpModal = () => {
  return (
    <>
      <SampleModal onClose={() => {}} />
    </>
  );
};
