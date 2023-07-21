import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGetMyAccount } from "../account";
import { api } from "../core";
import { useGetMemesByCollectionId } from "../meme";

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
      queryClient.invalidateQueries({ queryKey: useGetMemesByCollectionId.queryKey(sharedId) });
      queryClient.invalidateQueries({ queryKey: useGetMyAccount.queryKey });
    },
  });
};
