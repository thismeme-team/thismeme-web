import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { CategoryContent } from "./CategoryContent";

export default {
  title: "components/common/Category",
  component: CategoryContent,
} as ComponentMeta<typeof CategoryContent>;

export const Default: ComponentStory<typeof CategoryContent> = () => <CategoryContent />;
