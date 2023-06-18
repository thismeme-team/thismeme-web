import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { Chip } from "./Chip";

export default {
  title: "components/common/Chip",
  component: Chip,
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof Chip>;

//현재는 사이즈(medium,small)만 분리 ! 디자인 시스템 구축 후 더욱 세분화 될 예정
export const Default: ComponentStory<typeof Chip> = (args) => <Chip {...args} />;

Default.args = {
  color: "white",
  label: "무한도전",
  size: "medium",
};
