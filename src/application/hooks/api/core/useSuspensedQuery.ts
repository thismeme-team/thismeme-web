import type { QueryFunction, QueryKey } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import type {
  BaseSuspendedUseQueryResult,
  SuspendedUseQueryOptions,
  SuspendedUseQueryResultOnIdle,
  SuspendedUseQueryResultOnSuccess,
} from "@/application/hooks/api/core/types";

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
  } & Omit<SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "enabled"> & {
      enabled?: true;
    },
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
  } & Omit<SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "enabled"> & {
      enabled: false; // NOTE data undefined
    },
): SuspendedUseQueryResultOnIdle<undefined>;
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
