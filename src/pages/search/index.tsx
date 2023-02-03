import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { useInput, useRecentSearch } from "@/application/hooks";
import { TITLE } from "@/application/util";
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

  const onSearchByKeyword = () => {
    if (!inputProps.value || !inputProps.value.trim()) return;

    onClickAddKeyword(inputProps.value);
    router.push(`explore/keywords?q=${inputProps.value}`);
  };
  return (
    <>
      <Head>
        <title>{TITLE.getSearchPageTitle}</title>
        <meta content={TITLE.getSearchPageTitle} property="og:title" />
        <meta content={TITLE.getSearchPageTitle} property="og:description" />
      </Head>

      <SearchPageNavigation />
      <div className="relative mt-8">
        <SearchInput
          {...inputProps}
          placeholder="당신이 찾는 밈, 여기 있다."
          spellCheck={false}
          type="text"
          onSearchByKeyWord={onSearchByKeyword}
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
        <Suspense fallback={<div className="text-20-bold-140">로딩</div>}>
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
