import { useRouter } from "next/router";

import type { RecentSearch } from "@/application/hooks";
import { isTagType } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Icon } from "@/components/common/Icon";

import { SearchItem } from "../SearchItem";

interface Props {
  keywords: RecentSearch[];
  onClickDeleteKeyword: (recentSearch: RecentSearch) => void;
}

export const SearchRecent = ({ keywords, onClickDeleteKeyword }: Props) => {
  const router = useRouter();
  if (keywords.length === 0) return null;

  return (
    <div className="flex flex-col justify-between">
      {keywords.map((item) => {
        const { id, value, type } = item;
        return (
          <SearchItem
            key={id}
            left={<Icon className="min-w-24" name={`${isTagType(type) ? "pound" : "search"}`} />}
            searchText=""
            tagName={value}
            right={
              <Icon
                className="absolute right-6"
                name="delete2"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onClickDeleteKeyword(item);
                }}
              />
            }
            onPointerDown={() => {
              if (isTagType(type)) {
                router.push(`${PATH.getExploreByTagPath(value)}`);
                return;
              }
              router.push(`${PATH.getExploreByKeywordPath(value)}`);
            }}
          />
        );
      })}
    </div>
  );
};
