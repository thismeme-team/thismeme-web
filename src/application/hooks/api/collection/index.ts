import type { UseQueryOptions } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/infra/api";
import type { GetCollectionInfoByMemeIdResponse } from "@/infra/api/collection/types";

import { useSuspendedQuery } from "../core";
import { QUERY_KEYS } from "./queryKey";

/**
 * NOTE
 * 임시: 밈별 콜렉션 정보 API
 * 백엔드에 밈별 콜렉션 정보 API 인터페이스 요청하기
 */
export const useGetCollectionInfoByMemeId = <T = GetCollectionInfoByMemeIdResponse>(
  memeId: number,
  options?: UseQueryOptions<GetCollectionInfoByMemeIdResponse, any, T>,
) => {
  return useSuspendedQuery({
    queryKey: QUERY_KEYS.getCollectionInfoByMemeId(memeId),
    queryFn: () => api.collection.getCollectionInfoByMemeId(memeId),
    ...options,
  });
};

/**
 * 콜렉션 삭제 API
 */
export const useDeleteMemeFromCollection = ({ memeId }: { memeId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.collection.deleteMemeFromCollection(memeId),
    onMutate: async (deletedMemeId: number) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.getCollectionInfoByMemeId(deletedMemeId),
      });

      const previousCollectionInfo = queryClient.getQueryData(
        QUERY_KEYS.getCollectionInfoByMemeId(deletedMemeId),
      );

      queryClient.setQueryData(QUERY_KEYS.getCollectionInfoByMemeId(deletedMemeId), {
        collectionId: null,
        done: false,
      });

      return { previousCollectionInfo, deletedMemeId };
    },
    onError: (_, deletedMemeId, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.getCollectionInfoByMemeId(deletedMemeId),
        context?.previousCollectionInfo,
      );
    },
  });
};

/**
 * 콜렉션 저장 API
 */
export const usePostMemeToCollection = ({ memeId }: { memeId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.collection.postMemeToCollection(memeId),
    onMutate: async (newMemeId: number) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.getCollectionInfoByMemeId(newMemeId),
      });

      const previousCollectionInfo = queryClient.getQueryData(
        QUERY_KEYS.getCollectionInfoByMemeId(newMemeId),
      );

      queryClient.setQueryData(QUERY_KEYS.getCollectionInfoByMemeId(newMemeId), {
        collectionId: 1,
        done: true,
      });

      return { previousCollectionInfo, newMemeId };
    },
    onError: (_, newMemeId, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.getCollectionInfoByMemeId(newMemeId),
        context?.previousCollectionInfo,
      );
    },
  });
};
