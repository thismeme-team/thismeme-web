import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { SideBar } from "./SideBar";

export default {
  title: "components/common/Navigation/SideBar",
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

export const _SideBar: ComponentStory<typeof SideBar> = () => <SideBar />;
