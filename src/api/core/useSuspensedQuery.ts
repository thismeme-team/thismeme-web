import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export interface BaseSuspendedUseQueryResult<TData>
  extends Omit<
    UseQueryResult<TData, never>,
    "data" | "status" | "error" | "isLoading" | "isError" | "isFetching"
  > {
  data: TData;
  status: "success" | "idle";
}

export type SuspendedUseQueryResultOnSuccess<TData> = BaseSuspendedUseQueryResult<TData> & {
  status: "success";
  isSuccess: true;
  isIdle: false;
};
export type SuspendedUseQueryResultOnIdle<TData> = BaseSuspendedUseQueryResult<TData> & {
  status: "idle";
  isSuccess: false;
  isIdle: true;
};

export type SuspendedUseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "suspense">;

export type QuerySelectOption<Result, API extends (...args: any) => any> = (
  data: Awaited<ReturnType<API>>,
) => Result;
/**
 * @desc suspense 사용 시 non-nullable data 이도록 wrapping
 * @link https://github.com/toss/slash/blob/main/packages/react/react-query/src/hooks/useSuspendedQuery.ts
 */

export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  args: {
    queryKey: TQueryKey;
    queryFn: QueryFunction<TQueryFnData, TQueryKey>;
  } & Omit<SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "enabled">,
): SuspendedUseQueryResultOnSuccess<TData>;

export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  args: {
    queryKey: TQueryKey;
    queryFn: QueryFunction<TQueryFnData, TQueryKey>;
  } & SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): SuspendedUseQueryResultOnSuccess<TData> | SuspendedUseQueryResultOnIdle<undefined>;

export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  queryKey,
  queryFn,
  ...options
}: {
  queryKey: TQueryKey;
  queryFn: QueryFunction<TQueryFnData, TQueryKey>;
} & SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
    suspense: true,
  }) as BaseSuspendedUseQueryResult<TData>;
}
