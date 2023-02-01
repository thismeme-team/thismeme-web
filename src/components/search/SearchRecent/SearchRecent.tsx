import Link from "next/link";

import { Icon } from "@/components/common/Icon";
import type { SearchKeyword } from "@/types";

import { SearchItem } from "../SearchItem";

interface Props {
  keywords: SearchKeyword[];
  onClickDeleteKeyword: () => void;
}

export const SearchRecent = ({ keywords, onClickDeleteKeyword }: Props) => {
  if (keywords.length === 0) return null;

  return (
    <div className="flex justify-between">
      <div className="align-middle">
        {keywords.map((keyword) => (
          <Link href={`explore/keywords?q=${keyword.text}`} key={keyword.id}>
            <SearchItem right={<Icon name="delete2" />} searchText="" tagName={keyword.text} />
          </Link>
        ))}
      </div>
    </div>
  );
};
