import type { QueryClient, QueryFunctionContext } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSuspendedQuery } from "@/application/hooks/api/core";
import { api } from "@/infra/api";

import { QUERY_KEYS } from "./queryKey";
/**
 * 밈 상세 조회 API
 * @param id 상세 조회할 밈 id
 * @desc staleTime 0 : 조회수 증가를 위해 바로 브라우저에서 재요청
 *
 */
export const useMemeDetailById = (id: string) => {
  const { data, ...rest } = useSuspendedQuery({
    queryKey: QUERY_KEYS.getMemeDetailById(id),
    queryFn: () => api.meme.getMemeDetailById(id),
    staleTime: 0,
  });

  return { ...data, ...rest };
};

export const fetchMemeDetailById = (id: string, queryClient: QueryClient) =>
  queryClient.fetchQuery(QUERY_KEYS.getMemeDetailById(id), () => api.meme.getMemeDetailById(id));

/**
 * 인기 밈 리스트 API
 */
export const useGetPopularMemes = () => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getPopularMemes,
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.meme.getPopularMemes({ offset: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = data ? data.pages.flatMap(({ data }) => data) : [];
  return { data: memeList, ...rest };
};

/**
 * 콜렉션 별 밈 리스트 API
 *
 * NOTE
 * 현재 하나의 콜렉션만이 존재(즉, collectionId가 하나)
 * 추후에 여러개의 콜렉션을 다룰 예정(즉, collectionId에 여러개)
 *
 * 마이페이지(/mypage)에서는 무한스크롤 적용 안함
 * 콜렉션 페이지(/collect) 페이지에서 무한 스크롤 적용함
 */
export const useGetMemesByCollectionId = (collectionId: number) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getMemesByCollectionId(collectionId),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.meme.getMemesByCollectionId({ collectionId, offset: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = data ? data.pages.flatMap(({ data }) => data) : [];
  const isEmpty = data?.pages[0].data.length === 0;

  return { data: memeList, isEmpty, ...rest };
};
