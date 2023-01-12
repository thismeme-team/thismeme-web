import { useGetTagSearch } from "@/application/hooks";
import { Chip } from "@/components/common/Chip";

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
          <SearchItem
            searchText={value}
            tagName={tag.name}
            right={
              <Chip className="absolute right-6" color="black" label="무한도전" size="small" />
            }
            onClick={() => {
              onClickAddKeyword(tag.name);
            }}
          />
        </li>
      ))}
    </ul>
  );
};
