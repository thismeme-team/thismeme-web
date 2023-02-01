import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShareMeme } from "./ShareMeme";

export default {
  title: "components/home/ShareMeme",
  component: ShareMeme,
} as ComponentMeta<typeof ShareMeme>;

export const Default: ComponentStory<typeof ShareMeme> = () => <ShareMeme />;
