import { useQuery } from "@tanstack/react-query";

import { useDebounce } from "@/application/hooks";
import { api } from "@/infra/api";
import type { Tag } from "@/types";

export const useSearchResult = (value: string) => {
  const debouncedValue = useDebounce(value);

  const { data, ...rest } = useQuery<{ tags: Tag[] }>({
    queryKey: ["search", debouncedValue],
    queryFn: () => api.search.getRecentSearch(debouncedValue),
    keepPreviousData: true,
    enabled: !!debouncedValue,
  });
  return { searchResults: data?.tags, ...rest };
};
