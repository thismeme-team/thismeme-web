import Link from "next/link";

import { useSearchResult } from "@/application/hooks";

import { SearchItem } from "../SearchItem/SearchItem";

interface Prop {
  value: string;
  onClickAddKeyword: (text: string) => void;
}

export const SearchResultList = ({ value, onClickAddKeyword }: Prop) => {
  const { searchResults } = useSearchResult(value.trim());

  if (!value || searchResults?.length === 0) {
    return null;
  }
  return (
    <ul>
      {searchResults?.map((searchResult) => (
        <li key={searchResult.tagId}>
          <Link href={`explore/tags?q=${searchResult.name}`}>
            <SearchItem
              majorType={searchResult.categoryName}
              searchText={value}
              tagName={searchResult.name}
              onClick={() => {
                onClickAddKeyword(searchResult.name);
              }}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
