import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Category } from "./Category";

export default {
  title: "components/common/Navigation/Category",
  component: Category,
} as ComponentMeta<typeof Category>;

export const Default: ComponentStory<typeof Category> = () => <Category />;
