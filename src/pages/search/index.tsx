import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";

import { useInput, useRecentSearch } from "@/application/hooks";
import { SearchPageNavigation } from "@/components/common/Navigation";
import {
  SearchInput,
  SearchPopularList,
  SearchRecent,
  SearchResultList,
} from "@/components/search";

const SearchPage: NextPage = () => {
  const inputProps = useInput();
  const { keywords, onClickDeleteKeyword, onClickAddKeyword } = useRecentSearch();
  const router = useRouter();
  const [focus, setFocus] = useState(false);

  const onSearchByKeyword = () => {
    if (!inputProps.value || !inputProps.value.trim()) return;

    onClickAddKeyword(inputProps.value);
    router.push(`explore/keywords?q=${inputProps.value}`);
  };

  return (
    <>
      <SearchPageNavigation />
      <div className="relative mt-8">
        <SearchInput
          {...inputProps}
          placeholder="당신이 생각한 '그 밈' 검색하기"
          spellCheck={false}
          type="text"
          onSearchByKeyWord={onSearchByKeyword}
          onBlur={() => {
            setFocus(false);
          }}
          onFocus={() => {
            setFocus(true);
          }}
        />
        <p className="mt-9 mb-24 px-14 text-12-regular-160 text-gray-500">
          밈 제목,태그를 입력하세요
        </p>
        {inputProps.value && (
          <Suspense fallback={<div></div>}>
            <div className="absolute h-full w-full bg-white">
              <SearchResultList value={inputProps.value} onClickAddKeyword={onClickAddKeyword} />
            </div>
          </Suspense>
        )}
        <Suspense fallback={<div></div>}>
          {!inputProps.value && focus && (
            <SearchRecent keywords={keywords} onClickDeleteKeyword={onClickDeleteKeyword} />
          )}
          {!focus && (
            <div className="px-14">
              <SearchPopularList />
            </div>
          )}
        </Suspense>
      </div>
    </>
  );
};

export default SearchPage;
