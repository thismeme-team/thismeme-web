import type { QueryFunctionContext } from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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

/**
 * FIX
 * 1. query key관리
 * 2. ageParam, getNextPageParam 함수의 lastPage 등에 대한 타입추론
 * 3. getSearchResultsByKeyword 비동기 API에 대해 서버에서 받아온 데이터에 대한 스키마 필요(프론트에 필요한 데이터로 가공해야함)
 */
export const useGetSearchResultsByKeyword = (keyword: string) =>
  useInfiniteQuery(
    ["getSearchResultsByKeyword"],
    ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getSearchResultsByKeyword({ keyword, offset: pageParam, limit: 10 }),
    {
      getNextPageParam: (lastPage) => {
        const { isLastPage, pageNumber } = lastPage;
        return isLastPage ? undefined : pageNumber + 1;
      },
    },
  );
