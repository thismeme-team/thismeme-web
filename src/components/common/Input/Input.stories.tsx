import type { ComponentMeta } from "@storybook/react";

import Input from ".";

export default {
  title: "components/common/Input",
  component: Input,
} as ComponentMeta<typeof Input>;

export const MediumSearch = () => <Input placeholder="ex) 최고심" />;
export const SmallSearch = () => <Input />;
