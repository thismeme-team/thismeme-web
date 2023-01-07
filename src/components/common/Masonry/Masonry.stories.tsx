import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { MemeItem } from "@/components/meme/MemeItem";

import { Masonry } from "./Masonry";

export default {
  title: "components/common/Masonry",
  component: Masonry,
} as ComponentMeta<typeof Masonry>;

const sampleImages = [
  { url: "https://picsum.photos/400", width: 400, height: 400 },
  { url: "https://picsum.photos/200/300", width: 200, height: 300 },
  { url: "https://picsum.photos/500/200", width: 500, height: 200 },
  { url: "https://picsum.photos/500/400", width: 500, height: 400 },
  { url: "https://picsum.photos/700/400", width: 700, height: 400 },
  { url: "https://picsum.photos/235/294", width: 235, height: 294 },
  { url: "https://picsum.photos/236/354", width: 236, height: 354 },
];

const sampleArray = Array.from(Array(100).keys()).map((id) => {
  const randomIndex = Math.floor(Math.random() * sampleImages.length);
  const { url, width, height } = sampleImages[randomIndex];
  return {
    id,
    title: "무난한도전",
    image_url: url,
    image_width: width,
    image_height: height,
    tags: ["무한도전", "박명수"],
    view_count: 10,
    share_count: 132,
    create_date: new Date().toString(),
    modified_date: new Date().toString(),
  };
});

const Template: ComponentStory<typeof Masonry> = (args) => (
  <>
    <Masonry {...args}>
      {sampleArray.map((item) => {
        return <MemeItem key={item.id} meme={item} />;
      })}
    </Masonry>
  </>
);

export const Default = Template.bind({});
Default.args = {
  spacing: 8,
  columns: 4,
};
Default.argTypes = {
  spacing: {
    control: {
      type: "range",
      min: 0,
      max: 30,
      step: 1,
    },
  },
  columns: {
    control: {
      type: "range",
      min: 1,
      max: 8,
      step: 1,
    },
  },
};
