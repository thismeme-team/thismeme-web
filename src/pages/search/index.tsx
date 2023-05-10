import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense, useState } from "react";

import { useDebounce, useInput, useRecentSearch } from "@/application/hooks";
import { DEFAULT_DESCRIPTION, PATH, SITE_NAME } from "@/application/util";
import { SearchPageNavigation } from "@/components/common/Navigation";
import type { NextSeoProps } from "@/components/common/NextSeo";
import { NextSeo } from "@/components/common/NextSeo";
import { SSRSuspense } from "@/components/common/Suspense";
import {
  SearchInput,
  SearchPopularList,
  SearchRecent,
  SearchResultList,
} from "@/components/search";
import { SkeletonTagList } from "@/components/search/Skeleton";

/**
 * FIX
 * - SearchInput, SearchResult, SearchRecent 구조 개선(컴포넌트 상태관리)
 *   - solution: input과 list(최근 검색어 or 검색 결과 리스트)을 하나의 컴포넌트(ex. SearchBar 컴포넌트)와 context API로 추상화
 *   - {@link https://mui.com/material-ui/react-autocomplete/ AutoComplete}
 *   - {@link https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Autocomplete/Autocomplete.js AutoComplete source code}
 */
const SearchPage: NextPage = () => {
  const inputProps = useInput();
  const { items, onDeleteItem, onAddItem } = useRecentSearch();
  const router = useRouter();
  const [focus, setFocus] = useState(false);

  const onSearchByKeyword = () => {
    if (!inputProps.value || !inputProps.value.trim()) return;

    onAddItem({ value: inputProps.value, type: "keyword", id: Date.now() });
    router.push(PATH.getExploreByKeywordPath(inputProps.value));
  };
  const debouncedValue = useDebounce(inputProps.value);

  return (
    <>
      <NextSeo {...metadata} />

      <SearchPageNavigation />
      <div className="relative">
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
        <p className="mb-24 px-14 text-12-regular-160 text-gray-500">밈 제목,태그를 입력하세요</p>
        {inputProps.value && (
          <Suspense>
            <SearchResultList value={debouncedValue} onAddItem={onAddItem} />
          </Suspense>
        )}
        {!inputProps.value && focus && (
          <SearchRecent items={items} onAddItem={onAddItem} onDelete={onDeleteItem} />
        )}
        {!inputProps.value && !focus && (
          <SSRSuspense fallback={<SkeletonTagList />}>
            <SearchPopularList />
          </SSRSuspense>
        )}
      </div>
    </>
  );
};

const metadata: NextSeoProps = {
  title: `${SITE_NAME} : 무한도전 밈 검색`,
  description: DEFAULT_DESCRIPTION,

  openGraph: {
    siteName: SITE_NAME,
    imageUrl: `/open-graph/home.png`,
  },
  twitter: {
    cardType: "summary_large_image",
  },
};

export default SearchPage;
