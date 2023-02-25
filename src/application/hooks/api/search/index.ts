import type { QueryClient, QueryFunctionContext } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "@/infra/api";

import { useLocalStorage } from "../../common";
import type { RecentSearch } from "../../domain";
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
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getMemesByKeyword(keyword),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesByKeyword({ keyword, offset: pageParam, limit: PAGE_SIZE }),
    enabled: !!keyword,
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = data ? data.pages.flatMap(({ data }) => data) : [];
  const isEmpty = data?.pages[0].data.length === 0;

  return { data: memeList, isEmpty, fetchNextPage };
};

/**
 * tag 밈 검색 API
 * @param tag 검색할 tag
 * @returns
 * data - 밈 검색 결과
 * isEmpty - 밈 검색 결과가 없는 경우 true
 */
export const useGetMemesByTag = (tag: string) => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getMemesByTag(tag),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesByTag({ keyword: tag, offset: pageParam, limit: PAGE_SIZE }),
    enabled: !!tag,
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = data ? data.pages.flatMap(({ data }) => data) : [];
  const isEmpty = data?.pages[0].data.length === 0;

  return { data: memeList, isEmpty, fetchNextPage };
};
export const prefetchMemesByTag = (tag: string, queryClient: QueryClient) =>
  queryClient.fetchInfiniteQuery(QUERY_KEYS.getMemesByTag(tag), ({ pageParam = 0 }) =>
    api.search.getMemesByTag({ keyword: tag, offset: pageParam, limit: PAGE_SIZE }),
  );

/**
 * 회원이 찾는 밈 API
 */

export const useGetUserFindMemes = ({ userId }: { userId: number }) => {
  const [items] = useLocalStorage<RecentSearch[]>("recentSearch", { defaultValue: [] });
  const keywords = items
    .map((item) => item.value)
    .slice(0, 3)
    .join();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getUserFindMemes(keywords),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getUserFindMemes({
        keywords: keywords,
        offset: pageParam,
        limit: PAGE_SIZE,
        userId: String(userId),
      }),
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = data ? data.pages.flatMap(({ data }) => data) : [];
  const isEmpty = data?.pages[0].data.length === 0;

  return { data: memeList, isEmpty, fetchNextPage };
};

export const useGetMemesFromCollectionByKeyword = ({
  keyword,
  collectionId,
}: {
  keyword: string;
  collectionId: number;
}) => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getMemesFromCollectionByKeyword({ keyword: keyword, collectionId }),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesFromCollectionByKeyword({
        keyword: keyword,
        collectionId,
        offset: pageParam,
        limit: PAGE_SIZE,
      }),
    enabled: !!keyword && !!collectionId,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = data ? data.pages.flatMap(({ data }) => data) : [];
  const isEmpty = data?.pages[0].data.length === 0;

  return { data: memeList, fetchNextPage, isEmpty };
};
