import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGetMyAccount } from "../account";
import { api } from "../core";
import { useGetCollectionCheck } from "./useGetCollectionCheck";
/**
 * 콜렉션 저장 API
 */
export const usePostMemeToCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.collection.postMemeToCollection,
    onMutate: async (newMemeId) => {
      await queryClient.cancelQueries({
        queryKey: useGetCollectionCheck.queryKey(newMemeId),
      });

      const previousCollectionInfo = queryClient.getQueryData(
        useGetCollectionCheck.queryKey(newMemeId),
      );

      queryClient.setQueryData(useGetCollectionCheck.queryKey(newMemeId), {
        collectionId: 1,
        isAdded: true,
      });

      return { previousCollectionInfo, newMemeId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useGetMyAccount.queryKey });
    },
    onError: (_, newMemeId, context) => {
      queryClient.setQueryData(
        useGetCollectionCheck.queryKey(newMemeId),
        context?.previousCollectionInfo,
      );
    },
  });
};
