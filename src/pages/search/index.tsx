import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

import { SearchPageNavigation } from "@/common/components/Navigation";
import type { NextSeoProps } from "@/common/components/NextSeo";
import { NextSeo } from "@/common/components/NextSeo";
import { SSRSuspense } from "@/common/components/Suspense";
import { useDebounce, useInput } from "@/common/hooks";
import { DEFAULT_DESCRIPTION, PATH, SITE_NAME } from "@/common/utils";
import {
  SearchInput,
  SearchPopularList,
  SearchRecent,
  SearchResultList,
  SkeletonTagList,
} from "@/features/search/components";
import { useRecentSearch } from "@/features/search/hooks";

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
      <SearchInput
        {...inputProps}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        placeholder="당신이 생각한 '그 밈' 검색하기"
        spellCheck={false}
        type="text"
        onSearchByKeyWord={onSearchByKeyword}
      />
      {inputProps.value && (
        <>
          <p className="mb-4 text-16-semibold-140 text-gray-500">태그 자동완성</p>
          <Suspense>
            <SearchResultList value={debouncedValue} onAddItem={onAddItem} />
          </Suspense>
        </>
      )}
      {!inputProps.value && (
        <>
          <p className="text-16-semibold-140 text-gray-500">친구들이 찾는 인기태그</p>
          <SSRSuspense fallback={<SkeletonTagList />}>
            <SearchPopularList onAddItem={onAddItem} />
          </SSRSuspense>
        </>
      )}
      {!inputProps.value && (
        <>
          <p className="pt-12 pb-4 text-16-semibold-140 text-gray-500">최근 검색</p>
          <SearchRecent items={items} onAddItem={onAddItem} onDelete={onDeleteItem} />
        </>
      )}
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
