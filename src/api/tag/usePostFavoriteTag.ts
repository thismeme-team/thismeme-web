import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../core";
import { useGetFavoriteTags } from "./useGetFavoriteTags";
import { useGetTagInfo } from "./useGetTagInfo";

export const usePostFavoriteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.tags.postFavoriteTag,
    onMutate: async ({ tagId, name }) => {
      await queryClient.cancelQueries({ queryKey: useGetTagInfo.queryKey(tagId) });

      const previousTagInfo = queryClient.getQueryData(useGetTagInfo.queryKey(tagId)) as Awaited<
        ReturnType<typeof api.tags.getTagInfo>
      >;

      queryClient.setQueryData<Awaited<ReturnType<typeof api.tags.getFavoriteTags>>>(
        useGetFavoriteTags.queryKey,
        (old) => {
          if (!old) return;
          const newTags = [
            ...old.tags,
            {
              tagId: tagId,
              name: name,
              isFav: true,
            },
          ];

          return { tags: newTags };
        },
      );

      queryClient.setQueryData(useGetTagInfo.queryKey(tagId), (old) => ({
        ...(old as Awaited<ReturnType<typeof api.tags.getCategoryWithTags>>),
        isFav: true,
      }));

      return { previousTagInfo };
    },

    onError: (err, { tagId }, context) => {
      queryClient.setQueryData(useGetTagInfo.queryKey(tagId), context?.previousTagInfo);
    },
  });
};
