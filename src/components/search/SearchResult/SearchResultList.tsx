import Link from "next/link";

import { useGetTagSearch } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Icon } from "@/components/common/Icon";

import { SearchItem } from "../SearchItem/SearchItem";

interface Prop {
  value: string;
  onClickAddTag: (text: string) => void;
}

export const SearchResultList = ({ value, onClickAddTag }: Prop) => {
  const { autoCompletedTags } = useGetTagSearch(value.trim());

  if (!value || autoCompletedTags?.length === 0) {
    return null;
  }
  return (
    <ul>
      {autoCompletedTags?.map((tag) => (
        <li key={tag.tagId}>
          <Link href={PATH.getExploreByTagPath(tag.name)}>
            <SearchItem
              left={<Icon name="pound" />}
              searchText={value}
              tagName={tag.name}
              onClick={() => {
                onClickAddTag(tag.name);
              }}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
