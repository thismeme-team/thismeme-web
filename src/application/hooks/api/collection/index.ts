import type { QueryClient, UseQueryOptions } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/infra/api";
import type { GetCollectionCheckResponse } from "@/infra/api/collection/types";

import { QUERY_KEYS as ACCOUNT_QUERY_KEYS } from "../account/queryKey";
import { QUERY_KEYS as MEME_QUERY_KEYS } from "../meme/queryKey";
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
export const prefetchCollectionCheck = (memeId: number, queryClient: QueryClient) =>
  queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.getCollectionCheck(memeId),
    queryFn: () => api.collection.getCollectionCheck(memeId),
  });

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

export const usePostMemeToSharedCollection = ({
  memeId,
  sharedId,
}: {
  memeId: number;
  sharedId: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.collection.postMemeToSharedCollection(memeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEME_QUERY_KEYS.getMemesByCollectionId(sharedId) });
      queryClient.invalidateQueries({ queryKey: ACCOUNT_QUERY_KEYS.getMyAccount });
    },
  });
};
