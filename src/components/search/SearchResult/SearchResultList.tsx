import Link from "next/link";

import type { RecentSearch } from "@/application/hooks";
import { useGetTagSearch } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Icon } from "@/components/common/Icon";
import { SearchItem } from "@/components/search";

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
    <ul className="absolute w-full bg-white">
      {autoCompletedTags?.map((tag) => (
        <li key={tag.tagId}>
          <Link href={PATH.getExploreByTagPath(tag.tagId)}>
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
