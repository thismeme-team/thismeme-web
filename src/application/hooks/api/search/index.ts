import type { QueryFunctionContext } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { api } from "@/infra/api";

import { QUERY_KEYS } from "./queryKey";

const PAGE_SIZE = 20;

/**
 * keyword 밈 검색 API
 * @param keyword 검색할 keyword
 * @returns
 * data - 밈 검색 결과
 * isEmpty - 밈 검색 결과가 없는 경우 true
 */
export const useGetMemesByKeyword = (keyword: string) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getMemesByKeyword(keyword),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesByKeyword({ keyword, offset: pageParam, limit: PAGE_SIZE }),
    enabled: !!keyword,
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = useMemo(() => (data ? data.pages.flatMap(({ data }) => data) : []), [data]);
  const isEmpty = useMemo(
    () => data?.pages[0].isFirstPage && data.pages[0].data.length === 0,
    [data],
  );
  return { data: memeList, isEmpty, ...rest };
};

/**
 * tag 밈 검색 API
 * @param tag 검색할 tag
 * @returns
 * data - 밈 검색 결과
 * isEmpty - 밈 검색 결과가 없는 경우 true
 */
export const useGetMemesByTag = (tag: string) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getMemesByTag(tag),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesByTag({ keyword: tag, offset: pageParam, limit: PAGE_SIZE }),
    enabled: !!tag,
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = useMemo(() => (data ? data.pages.flatMap(({ data }) => data) : []), [data]);
  const isEmpty = useMemo(
    () => data?.pages[0].isFirstPage && data.pages[0].data.length === 0,
    [data],
  );
  return { data: memeList, isEmpty, ...rest };
};
