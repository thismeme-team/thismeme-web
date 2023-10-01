import type { QueryClient } from "@tanstack/react-query";

import { api, useSuspendedQuery } from "../core";

/**
 * 밈 상세 조회 API
 * @param id 상세 조회할 밈 id
 */
export const useGetMemeDetailById = (id: string) => {
  const { data, isRefetching } = useSuspendedQuery({
    queryKey: useGetMemeDetailById.queryKey(id),
    queryFn: () => useGetMemeDetailById.queryFn(id),
    staleTime: Infinity,
  });

  return { ...data, isRefetching };
};

useGetMemeDetailById.queryKey = (id: string) => ["getMemeDetailById", id] as const;

useGetMemeDetailById.queryFn = (id: string) => api.meme.getMemeDetailById(id);

useGetMemeDetailById.fetchQuery = (id: string, queryClient: QueryClient) =>
  queryClient.fetchQuery(useGetMemeDetailById.queryKey(id), () => api.meme.getMemeDetailById(id));
