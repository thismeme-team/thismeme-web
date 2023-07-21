import { useQuery } from "@tanstack/react-query";

import { api } from "../core";

/**
 * 인기 태그 조회 API
 */
export const useGetPopularTags = () => {
  const { data } = useQuery({
    queryKey: useGetPopularTags.queryKey,
    queryFn: useGetPopularTags.queryFn,
  });

  return { ...data };
};

useGetPopularTags.queryKey = ["getPopularTags"] as const;

useGetPopularTags.queryFn = () => api.tags.getPopularTags();
