import type { ComponentMeta } from "@storybook/react";

import { Chip } from "@/components/common/Chip";

import { SearchItem } from "./SearchItem";

export default {
  title: "components/search",
  component: SearchItem,
} as ComponentMeta<typeof SearchItem>;

export const MajoreSearch = () => (
  <SearchItem
    right={<Chip className="absolute right-6" color="black" label="예능별" size="small" />}
    searchText="축구"
    tagName="무한도전축구짤"
  />
);
export const NotMajorSearch = () => <SearchItem searchText="무한" tagName="도전무한" />;
