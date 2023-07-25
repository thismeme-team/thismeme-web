import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGetMyAccount } from "../account";
import { api } from "../core";
import { useGetCollectionCheck } from "./useGetCollectionCheck";
/**
 * 콜렉션 삭제 API
 */
export const useDeleteMemeFromCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.collection.deleteMemeFromCollection,
    onMutate: async (deletedMemeId) => {
      await queryClient.cancelQueries({
        queryKey: useGetCollectionCheck.queryKey(deletedMemeId),
      });

      const previousCollectionInfo = queryClient.getQueryData(
        useGetCollectionCheck.queryKey(deletedMemeId),
      );

      queryClient.setQueryData(useGetCollectionCheck.queryKey(deletedMemeId), {
        collectionId: null,
        isAdded: false,
      });

      return { previousCollectionInfo, deletedMemeId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useGetMyAccount.queryKey });
    },
    onError: (_, deletedMemeId, context) => {
      queryClient.setQueryData(
        useGetCollectionCheck.queryKey(deletedMemeId),
        context?.previousCollectionInfo,
      );
    },
  });
};
