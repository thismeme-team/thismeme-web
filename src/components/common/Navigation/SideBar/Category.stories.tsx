import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Category } from "./Category";

export default {
  title: "components/common/Accordion",
  component: Category,
} as ComponentMeta<typeof Category>;

const Template: ComponentStory<typeof Category> = () => <Category />;

export const Default = Template.bind({});
