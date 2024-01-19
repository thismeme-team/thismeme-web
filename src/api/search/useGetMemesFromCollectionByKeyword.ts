import type { QueryFunctionContext } from "@tanstack/react-query";

import { api, useCoreInfiniteQuery } from "../core";

const PAGE_SIZE = 20;

export const useGetMemesFromCollectionByKeyword = ({
  keyword,
  collectionId,
}: {
  keyword: string;
  collectionId: number;
}) => {
  const { data, isEmpty, isFetchingNextPage, fetchNextPage } = useCoreInfiniteQuery(
    useGetMemesFromCollectionByKeyword.queryKey({
      keyword: keyword,
      collectionId: collectionId,
    }),
    ({ pageParam = 0 }: QueryFunctionContext) =>
      api.search.getMemesFromCollectionByKeyword({
        keyword: keyword,
        collectionId,
        offset: pageParam,
        limit: PAGE_SIZE,
      }),
    PAGE_SIZE,
    {
      enabled: !!keyword && !!collectionId,
      keepPreviousData: true,
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

useGetMemesFromCollectionByKeyword.queryKey = ({
  keyword,
  collectionId,
}: {
  keyword: string;
  collectionId: number;
}) => ["getMemesFromCollectionByKeyword", { keyword, collectionId }] as const;
