import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Button } from "@/components/common/Button/Button";
import { IconButton } from "@/components/common/Button/IconButton";

export default {
  title: "components/common/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <>
    <Button {...args} />
    <IconButton className="bg-amber-300" icon="kakao" size="medium" />
    <IconButton className="bg-gray-100" icon="download" size="medium" />
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

export const Icon: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;
Icon.args = {
  size: "medium",
  icon: "download",
  className: "bg-[#FFE812]",
};
Icon.argTypes = {
  size: {
    control: "radio",
    options: ["medium"],
  },
  icon: {
    control: "radio",
    options: ["kakao", "download", "share"],
  },
};
