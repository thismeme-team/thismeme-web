import Link from "next/link";

import { useGetTagSearch } from "@/application/hooks";

import { SearchItem } from "../SearchItem/SearchItem";

interface Prop {
  value: string;
  onClickAddKeyword: (text: string) => void;
}

export const SearchResultList = ({ value, onClickAddKeyword }: Prop) => {
  const { autoCompletedTags } = useGetTagSearch(value.trim());

  if (!value || autoCompletedTags?.length === 0) {
    return null;
  }
  return (
    <ul>
      {autoCompletedTags?.map((tag) => (
        <li key={tag.tagId}>
          <Link href={`explore/tags?q=${tag.name}`}>
            <SearchItem
              searchText={value}
              tagName={tag.name}
              onClick={() => {
                onClickAddKeyword(tag.name);
              }}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
