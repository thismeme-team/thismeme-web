import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Skeleton } from "./Skeleton";

export default {
  title: "components/common/Skeleton",
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <div className="flex flex-col gap-20">
    <div>
      <h1 className="text-22-bold-140">variant, animation props을 변경해보세요.</h1>
      <div className="h-100">
        <Skeleton {...args} />
      </div>
    </div>
    <div className="flex flex-col gap-10">
      <h1 className="text-22-bold-140">font-size 에 따라서 높이를 추정합니다.</h1>
      <span className="flex gap-10 text-32-bold-140">
        <Skeleton animation={args.animation} className="w-full" />
        3.2rem
      </span>
      <span className="flex gap-10 text-22-bold-140">
        <Skeleton animation={args.animation} className="w-full" />
        2.2rem
      </span>
      <span className="flex gap-10 text-18-bold-140">
        <Skeleton animation={args.animation} className="w-full" />
        1.8rem
      </span>
      <span className="flex gap-10 text-16-semibold-140">
        <Skeleton animation={args.animation} className="w-full" />
        1.6rem
      </span>
      <span className="flex gap-10 text-14-semibold-140">
        <Skeleton animation={args.animation} className="w-full" />
        1.4rem
      </span>
      <span className="flex gap-10 text-12-regular-160">
        <Skeleton animation={args.animation} className="w-full" />
        1.2rem
      </span>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  width: 100,
  height: 100,
  animation: "pulse",
};
Default.argTypes = {
  width: {
    control: {
      type: "range",
      min: 10,
      max: 300,
      step: 10,
    },
  },
  height: {
    control: {
      type: "range",
      min: 10,
      max: 300,
      step: 10,
    },
  },
  variant: {
    control: { type: "select" },
    options: ["circular", "rectangular", "rounded", "text"],
  },
  animation: {
    control: { type: "select" },
    options: ["pulse", "wave", false],
  },
};
