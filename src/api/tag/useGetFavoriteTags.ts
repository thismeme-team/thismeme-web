import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { api } from "../core";

export const useGetFavoriteTags = (
  options: Pick<UseQueryOptions, "enabled"> = { enabled: false },
) => {
  const { data } = useQuery({
    queryKey: useGetFavoriteTags.queryKey,
    queryFn: useGetFavoriteTags.queryFn,
    ...options,
  });

  return { favoriteTags: data?.tags };
};

useGetFavoriteTags.queryKey = ["getFavoriteTags"] as const;

useGetFavoriteTags.queryFn = () => api.tags.getFavoriteTags();
