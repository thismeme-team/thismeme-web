import { useRouter } from "next/router";

import { Icon } from "@/components/common/Icon";
import type { SearchKeyword } from "@/types";

import { SearchItem } from "../SearchItem";

interface Props {
  keywords: SearchKeyword[];
  onClickDeleteKeyword: (text: string) => void;
}

export const SearchRecent = ({ keywords, onClickDeleteKeyword }: Props) => {
  const router = useRouter();
  if (keywords.length === 0) return null;

  return (
    <div className="flex justify-between">
      <div className="align-middle">
        {keywords.map((keyword) => (
          <SearchItem
            key={keyword.id}
            searchText=""
            tagName={keyword.text}
            right={
              <Icon
                className="absolute right-6"
                name="delete2"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onClickDeleteKeyword(keyword.text);
                }}
              />
            }
            onPointerDown={() => {
              router.push(`explore/keywords?q=${keyword.text}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};
