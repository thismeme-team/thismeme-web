import type { QueryKey, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

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
