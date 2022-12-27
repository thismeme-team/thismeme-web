import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { MemeList } from ".";

export default {
  title: "components/common/MemeList",
  component: MemeList,
} as ComponentMeta<typeof MemeList>;

const Template: ComponentStory<typeof MemeList> = () => (
  <>
    <MemeList />
  </>
);

export const Default = Template.bind({});
