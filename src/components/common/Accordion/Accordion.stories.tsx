import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Accordion } from ".";

export default {
  title: "components/common/SideBar",
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = () => (
  <>
    <Accordion items={[]} />
  </>
);

export const Default = Template.bind({});
