import { useQuery } from "@tanstack/react-query";

import { api } from "@/infra/api";
import type { Tag } from "@/types";

import { useDebounce } from "../../common";
import { QUERY_KEYS } from "./queryKey";

export const useGetPopularTags = () => {
  const { data, ...rest } = useQuery<{ tags: Tag[] }>({
    queryKey: QUERY_KEYS.getPopularTags,
    queryFn: () => api.tags.getPopularTags(),
  });

  return { tags: data?.tags, ...rest };
};

export const useGetTagSearch = (value: string) => {
  const debouncedValue = useDebounce(value);

  const { data, ...rest } = useQuery<{ tags: Tag[] }>({
    queryKey: QUERY_KEYS.getTagSearch(debouncedValue),
    queryFn: () => api.tags.getTagSearch(debouncedValue),
    keepPreviousData: true,
    enabled: !!debouncedValue,
  });
  return { autoCompletedTags: data?.tags, ...rest };
};
