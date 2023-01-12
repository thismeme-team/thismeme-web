import type { ComponentStory } from "@storybook/react";
import React from "react";

import { ExplorePageNavigation } from "@/components/common/Navigation/ExplorePageNavigation";
import { IntroPageNavigation } from "@/components/common/Navigation/IntroPageNavigation";
import { SearchPageNavigation } from "@/components/common/Navigation/SearchPageNavigation";

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
