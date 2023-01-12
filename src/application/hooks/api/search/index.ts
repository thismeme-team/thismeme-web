import type { QueryFunctionContext } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/infra/api";

import { QUERY_KEYS } from "./queryKey";

const PAGE_SIZE = 20;

/**
 * keyword 밈 검색 API
 * @param keyword 검색할 keyword
 * @returns UseInfiniteQueryResult - useInfiniteQuery의 반환값
 */
export const useGetMemesByKeyword = (keyword: string) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.getMemesByKeyword(keyword),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesByKeyword({ keyword, offset: pageParam, limit: PAGE_SIZE }),
    enabled: !!keyword,
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
};

/**
 * tag 밈 검색 API
 * @param tag 검색할 tag
 * @returns UseInfiniteQueryResult - useInfiniteQuery의 반환값
 */
export const useGetMemesByTag = (tag: string) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.getMemesByTag(tag),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesByTag({ keyword: tag, offset: pageParam, limit: PAGE_SIZE }),
    enabled: !!tag,
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
};
