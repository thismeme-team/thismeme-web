import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Button } from ".";

export default {
  title: "Example/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <>
    <Button {...args} />
    <Button className="h-46 w-46 rounded-20 bg-amber-300" icon="kakao" size="default" />
    <Button className="h-46 w-46 rounded-20 bg-gray-100" icon="download" size="default" />
    <Button className="border border-black" size="medium">
      팔로우
    </Button>
    <Button as="li" className="w-fit border border-black bg-black text-white" size="medium">
      팔로우
    </Button>
    <Button as="a" className="border border-black" href="#" size="medium">
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
