import { useQuery } from "@tanstack/react-query";
import { useDeferredValue } from "react";

import { getRecentSearch } from "@/infra/api/search";
import type { SearchResult } from "@/types";

import { useDebounce } from "../../common";

export const useSearchResult = (value: string) => {
  const debouncedQuery = useDebounce(value);
  const deferredQuery = useDeferredValue(debouncedQuery);

  const { data, ...rest } = useQuery<{ tags: SearchResult[] }>({
    queryKey: ["search", deferredQuery],
    queryFn: async () => await getRecentSearch(deferredQuery),
  });
  return { searchResults: data?.tags };
};
