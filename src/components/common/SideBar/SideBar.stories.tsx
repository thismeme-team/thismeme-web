import type { ComponentMeta, ComponentStory } from "@storybook/react";

import SideBar from ".";

export default {
  title: "components/common/SideBar",
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = () => (
  <>
    <SideBar />
  </>
);

export const Default = Template.bind({});
