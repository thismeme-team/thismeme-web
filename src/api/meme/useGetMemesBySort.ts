import type { QueryFunctionContext } from "@tanstack/react-query";

import { api, useCoreInfiniteQuery } from "../core";

const PAGE_SIZE = 10;

const types = { share: "shareCount", recent: "createdDate", popular: "viewCount", user: "user" };

/**
 * 밈 type 에 따른 리스트 api
 * @param sort  밈 리스트 type : share,recent,popular
 */
export const useGetMemesBySort = (sort: keyof typeof types) => {
  const { data, isEmpty, isFetchingNextPage, fetchNextPage } = useCoreInfiniteQuery(
    useGetMemesBySort.queryKey(sort),
    ({ pageParam = 0 }: QueryFunctionContext) =>
      api.meme.getMemesBySort({ offset: pageParam, limit: PAGE_SIZE, sort: types[sort] }),
    PAGE_SIZE,
    {
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
useGetMemesBySort.queryKey = (sort: string) => ["getMemesBySort", sort] as const;
