import type { QueryClient, QueryFunctionContext } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import type { RecentSearch } from "@/application/hooks";
import { useLocalStorage } from "@/application/hooks";
import { api } from "@/infra/api";

import { useCoreInfiniteQuery } from "../core/useCoreInfiniteQuery";
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
  const { data, isEmpty, isFetchingNextPage, fetchNextPage } = useCoreInfiniteQuery(
    QUERY_KEYS.getMemesByKeyword(keyword),
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

/**
 * tag 밈 검색 API
 * @param tag 검색할 tag
 * @returns
 * data - 밈 검색 결과
 * isEmpty - 밈 검색 결과가 없는 경우 true
 */
export const useGetMemesByTag = (tag: string) => {
  const { data, isEmpty, isFetchingNextPage, fetchNextPage } = useCoreInfiniteQuery(
    QUERY_KEYS.getMemesByTag(tag),
    ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesByTag({ keyword: tag, offset: pageParam, limit: PAGE_SIZE }),
    PAGE_SIZE,
    {
      enabled: !!tag,
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
export const prefetchMemesByTag = (tag: string, queryClient: QueryClient) =>
  queryClient.fetchInfiniteQuery(QUERY_KEYS.getMemesByTag(tag), ({ pageParam = 0 }) =>
    api.search.getMemesByTag({ keyword: tag, offset: pageParam, limit: PAGE_SIZE }),
  );

/**
 * 회원이 찾는 밈 API
 */
export const useGetUserFindMemes = ({ userId }: { userId: number }) => {
  const isMount = useRef(false);
  useEffect(() => {
    isMount.current = true;
  }, []);

  const [items] = useLocalStorage<RecentSearch[]>("recentSearch", { defaultValue: [] });
  const keywords = items
    .map((item) => item.value)
    .slice(0, 3)
    .join();

  const { data, isEmpty, isFetchingNextPage, fetchNextPage } = useCoreInfiniteQuery(
    QUERY_KEYS.getUserFindMemes(keywords),
    ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getUserFindMemes({
        keywords: keywords,
        offset: pageParam,
        limit: PAGE_SIZE,
        userId: String(userId),
      }),
    PAGE_SIZE,
    {
      enabled: isMount.current,
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

export const useGetMemesFromCollectionByKeyword = ({
  keyword,
  collectionId,
}: {
  keyword: string;
  collectionId: number;
}) => {
  const { data, isEmpty, isFetchingNextPage, fetchNextPage } = useCoreInfiniteQuery(
    QUERY_KEYS.getMemesFromCollectionByKeyword({
      keyword: keyword,
      collectionId: collectionId,
    }),
    ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesFromCollectionByKeyword({
        keyword: keyword,
        collectionId,
        offset: pageParam,
        limit: PAGE_SIZE,
      }),
    PAGE_SIZE,
    {
      enabled: !!keyword && !!collectionId,
      keepPreviousData: true,
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
