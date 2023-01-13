import { useQuery } from "@tanstack/react-query";

import { api } from "@/infra/api";
import type { GetPopularTagsResponse, GetTagSearchResponse } from "@/infra/api/tags/types";

import { useDebounce } from "../../common";
import { QUERY_KEYS } from "./queryKey";

/**
 * 인기 태그 조회 API
 */
export const useGetPopularTags = () => {
  const { data, ...rest } = useQuery<GetPopularTagsResponse>({
    queryKey: QUERY_KEYS.getPopularTags,
    queryFn: () => api.tags.getPopularTags(),
  });

  return { tags: data?.tags, ...rest };
};

/**
 * 태그 자동완성 API
 * @param value 검색어
 */
export const useGetTagSearch = (value: string) => {
  const debouncedValue = useDebounce(value);

  const { data, ...rest } = useQuery<GetTagSearchResponse>({
    queryKey: QUERY_KEYS.getTagSearch(debouncedValue),
    queryFn: () => api.tags.getTagSearch(debouncedValue),
    keepPreviousData: true,
    enabled: !!debouncedValue,
  });
  return { autoCompletedTags: data?.tags, ...rest };
};
