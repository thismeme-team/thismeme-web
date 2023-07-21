import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/application/hooks/api/account/queryKey";

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
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.getMyAccount });
    },
  });
};
