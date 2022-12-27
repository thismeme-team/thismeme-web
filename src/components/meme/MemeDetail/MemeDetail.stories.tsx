import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemeDetail } from "@/components/meme/MemeDetail/index";

export default {
  title: "components/meme/MemeDetail",
  component: MemeDetail,
} as ComponentMeta<typeof MemeDetail>;

export const Default: ComponentStory<typeof MemeDetail> = () => <MemeDetail id="1" />;
