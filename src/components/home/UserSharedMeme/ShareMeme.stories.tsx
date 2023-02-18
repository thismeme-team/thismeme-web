import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { SharedMemeItem } from "./SharedMemeItem";

export default {
  title: "components/home/ShareMeme",
  component: SharedMemeItem,
} as ComponentMeta<typeof SharedMemeItem>;

export const Default: ComponentStory<typeof SharedMemeItem> = () => <SharedMemeItem />;
