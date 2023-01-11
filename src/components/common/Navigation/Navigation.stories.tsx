import type { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { Navigation } from ".";

export default {
  title: "components/common/Layout/Navigation",
  component: Navigation,
  args: {
    page: "intro",
  },
} as ComponentMeta<typeof Navigation>;

export const IntroNavigation: ComponentStory<typeof Navigation> = (args) => (
  <Navigation {...args} />
);
export const SearchNavigation: ComponentStory<typeof Navigation> = () => (
  <Navigation page="search" />
);
export const ResultNavigation: ComponentStory<typeof Navigation> = () => (
  <Navigation page="result" />
);
