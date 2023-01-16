import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { SideBar as _SideBar } from "@/components/common/Navigation/SideBar/SideBar";

export default {
  title: "components/common/Navigation/SideBar",
  component: _SideBar,
} as ComponentMeta<typeof _SideBar>;

export const SideBar: ComponentStory<typeof _SideBar> = () => <_SideBar />;
