import type { QueryFunctionContext } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/infra/api";
import type { PaginationResponse, SearchResult } from "@/types";

import { QUERY_KEYS } from "./queryKey";

/**
 * FIX
 * 1. pageParam 타입추론
 * 2. getSearchResultsByKeyword 비동기 API에 대해 서버에서 받아온 데이터에 대한 스키마 필요(프론트에 필요한 데이터로 가공해야함)
 */
export const useGetSearchResultsByKeyword = (keyword: string) =>
  useInfiniteQuery<PaginationResponse<SearchResult>>({
    queryKey: QUERY_KEYS.getSearchResultsByKeyword(keyword),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getSearchResultsByKeyword({ keyword, offset: pageParam, limit: 20 }),
    suspense: false,
    enabled: !!keyword,
    getNextPageParam: (lastPage) => {
      const { isLastPage, pageNumber } = lastPage;
      return isLastPage ? undefined : pageNumber + 1;
    },
  });

/**
 * FIX
 * 1. pageParam 타입추론
 * 2. getSearchResultsByTag 비동기 API에 대해 서버에서 받아온 데이터에 대한 스키마 필요(프론트에 필요한 데이터로 가공해야함)
 */
export const useGetSearchResultsByTag = (tag: string) =>
  useInfiniteQuery<PaginationResponse<SearchResult>>({
    queryKey: QUERY_KEYS.getSearchResultsByTag(tag),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getSearchResultsByTag({ keyword: tag, offset: pageParam, limit: 20 }),
    suspense: false,
    enabled: !!tag,
    getNextPageParam: (lastPage) => {
      const { isLastPage, pageNumber } = lastPage;
      return isLastPage ? undefined : pageNumber + 1;
    },
  });
