import type { QueryFunctionContext } from "@tanstack/react-query";

import { api, useCoreInfiniteQuery } from "../core";

const PAGE_SIZE = 10;

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
  const { data, isEmpty, isFetchingNextPage, fetchNextPage } = useCoreInfiniteQuery(
    useGetMemesByCollectionId.queryKey(collectionId),
    ({ pageParam = 0 }: QueryFunctionContext) =>
      api.meme.getMemesByCollectionId({ collectionId, offset: pageParam, limit: PAGE_SIZE }),
    PAGE_SIZE,
    {
      staleTime: 1000 * 5,
      select: (data) => {
        return {
          pages: data.pages.map((page) => ({ data: page.memes })),
          pageParams: data.pageParams,
        };
      },
    },
  );

  return { data, isEmpty, isFetchingNextPage, fetchNextPage };
};

useGetMemesByCollectionId.queryKey = (collectionId: number | null) =>
  ["getMemesByCollectionId", collectionId] as const;
