import { useMutation, useQueryClient } from "@tanstack/react-query";

import { delay } from "@/common/utils";

import { api } from "../core";
import { useGetFavoriteTags } from "./useGetFavoriteTags";
import { useGetTagInfo } from "./useGetTagInfo";

export const useDeleteFavoriteTag = (wait = 0) => {
  const queryClient = useQueryClient();

  const controller = new AbortController();

  const mutation = useMutation({
    mutationFn: (id: number) => api.tags.deleteFavoriteTag(id, controller.signal),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: useGetTagInfo.queryKey(id) });
      await queryClient.cancelQueries({ queryKey: useGetFavoriteTags.queryKey });

      const previousFavoriteCategory = queryClient.getQueryData(useGetFavoriteTags.queryKey);
      const previousTagInfo = queryClient.getQueryData(useGetTagInfo.queryKey(id)) as Awaited<
        ReturnType<typeof api.tags.getTagInfo>
      >;

      queryClient.setQueryData<Awaited<ReturnType<typeof api.tags.getFavoriteTags>>>(
        useGetFavoriteTags.queryKey,
        (old) => {
          if (!old) return;
          const newTags = old.tags.filter((tag) => tag.tagId !== id);
          return { tags: newTags };
        },
      );

      queryClient.setQueryData(useGetTagInfo.queryKey(id), (old) => ({
        ...(old as Awaited<ReturnType<typeof api.tags.getFavoriteTags>>),
        isFav: false,
      }));

      await delay(wait);
      return { previousTagInfo, previousFavoriteCategory };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(useGetTagInfo.queryKey(id), context?.previousTagInfo);
      queryClient.setQueryData(useGetFavoriteTags.queryKey, context?.previousFavoriteCategory);
    },
  });
  return { ...mutation, onCancel: () => controller.abort() };
};
