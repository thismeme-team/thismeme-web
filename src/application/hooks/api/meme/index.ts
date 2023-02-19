import type { QueryClient, QueryFunctionContext } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSuspendedQuery } from "@/application/hooks/api/core";
import { api } from "@/infra/api";

import { QUERY_KEYS } from "./queryKey";

const LIMIT = 10;

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
 * 밈 type 에 따른 리스트 api
 * @param sort  밈 리스트 type : share,recent,popular
 */
const types = { share: "shareCount", recent: "createdDate", popular: "viewCount", user: "user" };

export const useGetMemesBySort = (sort: keyof typeof types) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getMemesBySort(sort),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.meme.getMemesBySort({ offset: pageParam, limit: LIMIT, sort: types[sort] }),
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = data ? data.pages.flatMap(({ data }) => data) : [];
  return { data: memeList, ...rest };
};

/*NOTE 회원이 공유한 밈 api collection으로 요망*/
export const useGetUserSharedMemes = () => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getUserSharedMemes,
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.meme.getUserSharedMemes({ offset: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = data ? data.pages.flatMap(({ data }) => data) : [];
  return { data: memeList, ...rest };
};

export const useGetUserFindMemes = () => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getUserFindMemes,
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.meme.getUserFindMemes({ offset: pageParam, limit: LIMIT }),
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = data ? data.pages.flatMap(({ data }) => data) : [];
  return { data: memeList, ...rest };
};
