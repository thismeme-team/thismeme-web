import { useQuery } from "@tanstack/react-query";

import { api } from "../core";

/**
 * 태그 자동완성 API
 * @param value 검색어
 */
export const useGetTagSearch = (value: string) => {
  const { data, ...rest } = useQuery({
    queryKey: useGetTagSearch.queryKey(value),
    queryFn: () => useGetTagSearch.queryFn(value),
    keepPreviousData: true,
    enabled: !!value,
  });
  return { autoCompletedTags: data?.tags, ...rest };
};

useGetTagSearch.queryKey = (value: string) => ["getTagSearch", value] as const;

useGetTagSearch.queryFn = (value: string) => api.tags.getTagSearch(value);
