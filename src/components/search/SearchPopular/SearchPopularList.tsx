import { usePopularTag } from "@/application/hooks";
import type { Tag } from "@/types";

import { SearchPopularItem } from "./SearchPopularItem";

export const SearchPopularList = () => {
  const { tags } = usePopularTag();

  return (
    <ul>
      {tags?.map((tag: Tag, index) => (
        <li key={tag.tagId}>
          <SearchPopularItem index={index} name={tag.name} />
        </li>
      ))}
    </ul>
  );
};
