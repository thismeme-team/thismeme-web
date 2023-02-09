import type { QueryFunctionContext } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSuspendedQuery } from "@/application/hooks/api/core";
import { api } from "@/infra/api";

import { QUERY_KEYS } from "./queryKey";
/**
 * 밈 상세 조회 API
 * @param id 상세 조회할 밈 id
 */
export const useMemeDetailById = (id: string) => {
  const { data, ...rest } = useSuspendedQuery({
    queryKey: QUERY_KEYS.getMemeDetailById(id),
    queryFn: () => api.meme.getMemeDetailById(id),
  });

  return { ...data, ...rest };
};

/**
 * 인기 밈 리스트 API
 */
export const useGetPopularMemes = () => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getPopularMemes,
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.meme.getPopularMemes({ offset: pageParam, limit: 4 }),
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = data ? data.pages.flatMap(({ data }) => data) : [];
  return { data: memeList, ...rest };
};
