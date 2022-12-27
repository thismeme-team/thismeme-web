import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemeDetail } from ".";

export default {
  title: "components/meme/MemeDetail",
  component: MemeDetail,
} as ComponentMeta<typeof MemeDetail>;

export const Default: ComponentStory<typeof MemeDetail> = (args) => <MemeDetail {...args} />;
Default.args = {
  id: "1",
};
