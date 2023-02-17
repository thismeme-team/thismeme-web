import { useMutation } from "@tanstack/react-query";

import { api } from "@/infra/api";

export const usePostMemeToSharedCollection = ({ memeId }: { memeId: number }) => {
  return useMutation({
    mutationFn: () => api.collection.postMemeToSharedCollection(memeId),
  });
};
