import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Icon from ".";

export default {
  title: "components/common/Icon",
  component: Icon,
  argTypes: {
    width: {
      control: "select",
      options: [10, 20, 30, 40, 50],
    },
    height: {
      control: "select",
      options: [10, 20, 30, 40, 50],
    },
  },
} as ComponentMeta<typeof Icon>;

export const Default: ComponentStory<typeof Icon> = ({ ...args }) => <Icon {...args} />;
Default.args = {
  name: "back",
  width: 30,
  height: 30,
};
