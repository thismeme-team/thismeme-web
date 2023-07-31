import type {
  InfiniteData,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { GetMemesResponse, Meme } from "@/types";

type BaseQueryFnData = GetMemesResponse;

type BaseData = { data: Meme[] };

type UseCoreInfiniteQuerySelect<TQueryFnData, TData> =
  | ((data: InfiniteData<TQueryFnData>) => InfiniteData<TData>)
  | undefined;

type UseCoreInfiniteQueryResult<TData, TError> = Omit<
  UseInfiniteQueryResult<TData, TError>,
  "data"
> & {
  data: Meme[];
  isEmpty: boolean;
  isFetchingBackground: boolean;
};

export function useCoreInfiniteQuery<
  TQueryFnData extends BaseQueryFnData = BaseQueryFnData,
  TError = unknown,
  TData extends BaseData = BaseData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  pageSize: number,
  options?: Omit<
    UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    "queryKey" | "queryFn" | "select"
  > & { select: UseCoreInfiniteQuerySelect<TQueryFnData, TData> },
): UseCoreInfiniteQueryResult<TData, TError> {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    isError,
    fetchNextPage: oldFetchNextPage,
    ...rest
  } = useInfiniteQuery(queryKey, queryFn, {
    getNextPageParam: (lastPage, allPages) => {
      const { count } = lastPage;
      const isLastPage = count < pageSize;
      const offset = count * (allPages.length - 1);
      return isLastPage ? undefined : offset + pageSize;
    },
    ...options,
  });
  const fetchNextPage = isError ? ((() => {}) as typeof oldFetchNextPage) : oldFetchNextPage;

  const flatData = data ? data.pages.flatMap(({ data }) => data) : [];
  const isEmpty = data?.pages[0].data.length === 0;
  const isFetchingBackground = isFetching && !isFetchingNextPage;

  return {
    data: flatData,
    isEmpty,
    isFetching,
    isFetchingNextPage,
    isFetchingBackground,
    isError,
    fetchNextPage,
    ...rest,
  };
}
