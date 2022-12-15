import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Button from ".";

export default {
  title: "Example/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <>
    <Button {...args} />
    <Button size="default" icon="kakao" className="h-46 w-46 rounded-20 bg-amber-300" />
    <Button size="default" icon="download" className="h-46 w-46 rounded-20 bg-gray-100" />
    <Button size="medium" className="border border-black">
      팔로우
    </Button>
    <Button as="li" size="medium" className="w-fit border border-black bg-black text-white">
      팔로우
    </Button>
    <Button size="medium" as="a" href="#" className="border border-black">
      링크
    </Button>
  </>
);

export const Default = Template.bind({});
Default.args = {
  children: "로그아웃",
  size: "large",
  className: "w-full bg-black text-white",
};
