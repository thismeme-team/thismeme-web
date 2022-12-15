import type { ComponentMeta } from "@storybook/react";

import SearchInput from ".";

export default {
  title: "components/search/searchInput",
  component: SearchInput,
} as ComponentMeta<typeof SearchInput>;

export const SearchInputExample = () => <SearchInput placeholder="ex) 최고심" />;
