import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { SharedMeme } from "./SharedMeme";

export default {
  title: "components/home/ShareMeme",
  component: SharedMeme,
} as ComponentMeta<typeof SharedMeme>;

export const Default: ComponentStory<typeof SharedMeme> = () => <SharedMeme />;
