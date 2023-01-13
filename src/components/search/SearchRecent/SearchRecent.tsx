import Link from "next/link";

import { Chip } from "@/components/common/Chip";
import type { SearchKeyword } from "@/types";

interface Props {
  keywords: SearchKeyword[];
  onClickDeleteKeyword: () => void;
}

export const SearchRecent = ({ keywords, onClickDeleteKeyword }: Props) => {
  if (keywords.length === 0) return null;

  return (
    <div className="mb-31">
      <div className="flex justify-between">
        <span className="text-15-semibold-130 text-dark-gray-10">최근 검색어</span>
        <button className="text-15-semibold-130 text-gray-10" onClick={onClickDeleteKeyword}>
          지우기
        </button>
      </div>
      <div className="flex flex-wrap align-middle">
        {keywords.map((keyword) => (
          <Link href={`explore/keywords?q=${keyword.text}`} key={keyword.id}>
            <Chip className="m-4" color="white" label={keyword.text} size="medium" />
          </Link>
        ))}
      </div>
    </div>
  );
};
