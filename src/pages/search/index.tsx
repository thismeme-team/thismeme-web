import { Suspense } from "react";

import { useInput, useRecentSearch } from "@/application/hooks";
import { SearchPageNavigation } from "@/components/common/Navigation";
import {
  SearchInput,
  SearchPopularList,
  SearchRecent,
  SearchResultList,
} from "@/components/search";

const SearchPage = () => {
  const inputProps = useInput();
  const { keywords, onClickDeleteKeyword, onClickAddKeyword } = useRecentSearch();

  return (
    <>
      <SearchPageNavigation />
      <div className="relative mt-8">
        <SearchInput
          {...inputProps}
          placeholder="당신이 찾는 밈, 여기 있다."
          spellCheck={false}
          type="text"
          onClickAddKeyword={onClickAddKeyword}
        />
        <p className="my-16 px-14 text-12-regular-160 text-gray-10">
          밈 제목,태그 설명을 입력하세요
        </p>
        {inputProps.value && (
          <Suspense fallback={<div>loading...</div>}>
            <div className="absolute h-full w-full bg-white">
              <SearchResultList value={inputProps.value} onClickAddKeyword={onClickAddKeyword} />
            </div>
          </Suspense>
        )}
        <Suspense fallback={<div className="text-20-bold-140">로딩중중</div>}>
          <div className="px-14">
            <SearchRecent keywords={keywords} onClickDeleteKeyword={onClickDeleteKeyword} />
            <div className="mb-8 text-15-semibold-130 text-dark-gray-10">인기 검색어</div>
            <SearchPopularList />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default SearchPage;
