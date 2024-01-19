import type { QueryClient, QueryFunctionContext } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import { api } from "../core";

const PAGE_SIZE = 20;

/**
 * tag 밈 검색 API
 * @param tag 검색할 tag
 * @returns
 * data - 밈 검색 결과
 * isEmpty - 밈 검색 결과가 없는 경우 true
 */
export const useGetMemesByTag = (tag: string) => {
  const {
    data,
    isFetchingNextPage,
    isError,
    fetchNextPage: originalFetchNextPage,
  } = useInfiniteQuery(
    useGetMemesByTag.queryKey(tag),
    ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesByTag({ keyword: tag, offset: pageParam, limit: PAGE_SIZE }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const { count } = lastPage;
        const isLastPage = count < PAGE_SIZE;
        const offset = count * (allPages.length - 1);
        return isLastPage ? undefined : offset + PAGE_SIZE;
      },
      enabled: !!tag,
    },
  );

  const fetchNextPage = isError
    ? ((() => {}) as typeof originalFetchNextPage)
    : originalFetchNextPage;
  const memes = data?.pages.flatMap(({ memes }) => memes) || [];
  const totalCount = data?.pages[0].totalCount;
  const isEmpty = !memes.length;

  return { data: memes, totalCount, isEmpty, isFetchingNextPage, fetchNextPage };
};

useGetMemesByTag.queryKey = (tag: string) => ["getMemesByTag", tag] as const;

useGetMemesByTag.fetchInfiniteQuery = (tag: string, queryClient: QueryClient) =>
  queryClient.fetchInfiniteQuery(useGetMemesByTag.queryKey(tag), ({ pageParam = 0 }) =>
    api.search.getMemesByTag({ keyword: tag, offset: pageParam, limit: PAGE_SIZE }),
  );
