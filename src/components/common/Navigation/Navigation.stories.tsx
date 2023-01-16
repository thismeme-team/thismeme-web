import type { ComponentStory } from "@storybook/react";
import React from "react";

import { ExplorePageNavigation } from "./ExplorePageNavigation";
import { IntroPageNavigation } from "./IntroPageNavigation";
import { SearchPageNavigation } from "./SearchPageNavigation";

export default {
  title: "components/common/Navigation",
  component: null,
};

export const IntroNavigation: ComponentStory<typeof IntroPageNavigation> = () => (
  <IntroPageNavigation />
);
export const SearchNavigation: ComponentStory<typeof SearchPageNavigation> = () => (
  <SearchPageNavigation />
);
export const ExploreNavigation: ComponentStory<typeof ExplorePageNavigation> = () => (
  <ExplorePageNavigation />
);
