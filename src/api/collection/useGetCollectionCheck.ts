import type { QueryClient, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "../core";

/**
 * 밈별 콜렉션 정보 API
 */
export const useGetCollectionCheck = (
  memeId: number,
  options?: Pick<UseQueryOptions, "enabled">,
) => {
  return useQuery({
    queryKey: useGetCollectionCheck.queryKey(memeId),
    queryFn: () => useGetCollectionCheck.queryFn(memeId),
    suspense: false,
    ...options,
  });
};

useGetCollectionCheck.queryKey = (memeId: number) => ["getCollectionCheck", memeId] as const;

useGetCollectionCheck.queryFn = (memeId: number) => api.collection.getCollectionCheck(memeId);

useGetCollectionCheck.prefetchQuery = (memeId: number, queryClient: QueryClient) =>
  queryClient.prefetchQuery({
    queryKey: useGetCollectionCheck.queryKey(memeId),
    queryFn: () => useGetCollectionCheck.queryFn(memeId),
  });
