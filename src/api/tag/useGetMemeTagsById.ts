import type { QueryClient } from "@tanstack/react-query";

import { api, useSuspendedQuery } from "../core";

export const useGetMemeTagsById = (id: string) => {
  const { data, ...rest } = useSuspendedQuery({
    queryKey: useGetMemeTagsById.queryKey(id),
    queryFn: () => useGetMemeTagsById.queryFn(id),
    staleTime: Infinity,
  });
  return { ...data, ...rest };
};

useGetMemeTagsById.queryKey = (id: string) => ["getMemeTagsById", id] as const;

useGetMemeTagsById.queryFn = (id: string) => api.tags.getMemeTagsById(id);

useGetMemeTagsById.fetchQuery = (id: string, queryClient: QueryClient) =>
  queryClient.fetchQuery(useGetMemeTagsById.queryKey(id), () => useGetMemeTagsById.queryFn(id));
