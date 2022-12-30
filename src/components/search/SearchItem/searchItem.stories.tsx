import type { ComponentMeta } from "@storybook/react";

import { SearchItem } from "./SearchItem";

export default {
  title: "components/search",
  component: SearchItem,
} as ComponentMeta<typeof SearchItem>;

export const MajoreSearch = () => (
  <SearchItem majorType="예능별" searchText="축구" tagName="무한도전축구짤" />
);
export const NotMajorSearch = () => <SearchItem searchText="무한" tagName="도전무한" />;
