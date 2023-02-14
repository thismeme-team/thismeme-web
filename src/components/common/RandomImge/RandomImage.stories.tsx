import type { ComponentMeta } from "@storybook/react";

import { RandomImage } from "./RandomImage";

export default {
  title: "components/common/RandomImage",
  component: RandomImage,
} as ComponentMeta<typeof RandomImage>;

export const Default = () => (
  <>
    <RandomImage className="w-200" />
  </>
);
