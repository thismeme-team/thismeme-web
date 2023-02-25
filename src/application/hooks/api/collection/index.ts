import type { QueryFunctionContext, UseQueryOptions } from "@tanstack/react-query";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/infra/api";
import type { GetCollectionCheckResponse } from "@/infra/api/collection/types";

import { QUERY_KEYS } from "./queryKey";
/**
 * 밈별 콜렉션 정보 API
 */
export const useGetCollectionCheck = <T = GetCollectionCheckResponse>(
  memeId: number,
  options?: UseQueryOptions<GetCollectionCheckResponse, unknown, T>,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.getCollectionCheck(memeId),
    queryFn: () => api.collection.getCollectionCheck(memeId),
    suspense: false,
    ...options,
  });
};

/**
 * 콜렉션 삭제 API
 */
export const useDeleteMemeFromCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.collection.deleteMemeFromCollection,
    onMutate: async (deletedMemeId) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.getCollectionCheck(deletedMemeId),
      });

      const previousCollectionInfo = queryClient.getQueryData(
        QUERY_KEYS.getCollectionCheck(deletedMemeId),
      );

      queryClient.setQueryData(QUERY_KEYS.getCollectionCheck(deletedMemeId), {
        collectionId: null,
        isAdded: false,
      });

      return { previousCollectionInfo, deletedMemeId };
    },
    onError: (_, deletedMemeId, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.getCollectionCheck(deletedMemeId),
        context?.previousCollectionInfo,
      );
    },
  });
};

/**
 * 콜렉션 저장 API
 */
export const usePostMemeToCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.collection.postMemeToCollection,
    onMutate: async (newMemeId) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.getCollectionCheck(newMemeId),
      });

      const previousCollectionInfo = queryClient.getQueryData(
        QUERY_KEYS.getCollectionCheck(newMemeId),
      );

      queryClient.setQueryData(QUERY_KEYS.getCollectionCheck(newMemeId), {
        collectionId: 1,
        isAdded: true,
      });

      return { previousCollectionInfo, newMemeId };
    },
    onError: (_, newMemeId, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.getCollectionCheck(newMemeId),
        context?.previousCollectionInfo,
      );
    },
  });
};

export const useGetMemesBySharedId = (collectionId: number) => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEYS.getMemesBySharedId(collectionId),
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) =>
      api.meme.getMemesByCollectionId({ collectionId, offset: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => {
      const { isLastPage, offset, limit } = lastPage;
      return isLastPage ? undefined : offset + limit;
    },
  });
  const memeList = data ? data.pages.flatMap(({ data }) => data) : [];
  const isEmpty = data?.pages[0].data.length === 0;

  return { data: memeList, fetchNextPage, isEmpty };
};

export const usePostMemeToSharedCollection = ({ memeId }: { memeId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.collection.postMemeToSharedCollection(memeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.getMemesBySharedId(4) });
    },
  });
};
