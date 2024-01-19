import type { QueryFunctionContext } from "@tanstack/react-query";

import { api, useCoreInfiniteQuery } from "../core";

const PAGE_SIZE = 20;

/**
 * keyword 밈 검색 API
 * @param keyword 검색할 keyword
 * @returns
 * data - 밈 검색 결과
 * isEmpty - 밈 검색 결과가 없는 경우 true
 */
export const useGetMemesByKeyword = (keyword: string) => {
  const { data, isEmpty, isFetchingNextPage, fetchNextPage } = useCoreInfiniteQuery(
    useGetMemesByKeyword.queryKey(keyword),
    ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesByKeyword({ keyword, offset: pageParam, limit: PAGE_SIZE }),
    PAGE_SIZE,
    {
      enabled: !!keyword,
      select: (data) => {
        return {
          pages: data.pages.map((page) => ({ data: page.memes })),
          pageParams: data.pageParams,
        };
      },
    },
  );

  return { data, isEmpty, isFetchingNextPage, fetchNextPage };
};

useGetMemesByKeyword.queryKey = (keyword: string) => ["getMemesByKeyword", keyword] as const;
