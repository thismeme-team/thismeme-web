import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Logo from "/public/icon/logo.svg";
import Menu from "/public/icon/menu.svg";
import Profile from "/public/icon/mockProfile.svg";

import TopNavigation from "./TopNavigation";

export default {
  title: "components/common/Layout/Navigation",
  component: TopNavigation,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof TopNavigation>;

export const IntroTopNavigation: ComponentStory<typeof TopNavigation> = () => (
  <TopNavigation left={<Logo />} right={[<Profile key="profile" />, <Menu key="menu" />]} />
);
