import { Chip } from "@/components/common/Chip";
import type { SearchKeyword } from "@/types";

interface Props {
  keywords: SearchKeyword[];
  onClickDeleteKeyword: () => void;
}

export const SearchRecent = ({ keywords, onClickDeleteKeyword }: Props) => {
  if (keywords.length === 0) return null;

  return (
    <>
      <div className="flex justify-between">
        <span className="text-semi-bold text-[1.4rem] text-dark-gray-10">최근 검색어</span>
        <button
          className="text-semi-bold text-[1.4rem] text-gray-10"
          onClick={onClickDeleteKeyword}
        >
          지우기
        </button>
      </div>
      <div className="flex flex-wrap align-middle">
        {keywords.map((keyword) => (
          <Chip className="m-4" color="white" key={keyword.id} label={keyword.text} size="medium" />
        ))}
      </div>
    </>
  );
};
