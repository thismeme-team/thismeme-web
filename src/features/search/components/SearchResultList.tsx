import Link from "next/link";

import { useGetTagSearch } from "@/api/tag";
import { Icon } from "@/common/components/Icon";
import { PATH } from "@/common/utils";

import type { RecentSearch } from "../hooks";
import { SearchItem } from "./SearchItem";

interface Prop {
  value: string;
  onAddItem: ({ value, type, id }: RecentSearch) => void;
}

export const SearchResultList = ({ value, onAddItem }: Prop) => {
  const { autoCompletedTags } = useGetTagSearch(value.trim());

  if (!value || autoCompletedTags?.length === 0) {
    return null;
  }
  return (
    <ul className="absolute bg-white">
      {autoCompletedTags?.map((tag) => (
        <li key={tag.tagId}>
          <Link href={PATH.getExploreByTagPath(tag.tagId, tag.name)}>
            <SearchItem
              searchText={value}
              startComponent={<Icon name="pound" />}
              tagName={tag.name}
              onClick={() => {
                onAddItem({ value: tag.name, type: "tag", id: tag.tagId });
              }}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
