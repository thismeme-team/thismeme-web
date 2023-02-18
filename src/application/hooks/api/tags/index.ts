import type { QueryClient } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useDebounce } from "@/application/hooks";
import { useSuspendedQuery } from "@/application/hooks/api/core";
import type { QuerySelectOption } from "@/application/hooks/api/core/types";
import { delay } from "@/application/util";
import { api } from "@/infra/api";
import type { GetPopularTagsResponse, GetTagSearchResponse } from "@/infra/api/tags/types";

import { QUERY_KEYS } from "./queryKey";

/**
 * 인기 태그 조회 API
 */
export const useGetPopularTags = () => {
  const { data, ...rest } = useQuery<GetPopularTagsResponse>({
    queryKey: QUERY_KEYS.getPopularTags,
    queryFn: () => api.tags.getPopularTags(),
  });

  return { tags: data?.tags, ...rest };
};

/**
 * 태그 자동완성 API
 * @param value 검색어
 */
export const useGetTagSearch = (value: string) => {
  const debouncedValue = useDebounce(value);

  const { data, ...rest } = useQuery<GetTagSearchResponse>({
    queryKey: QUERY_KEYS.getTagSearch(debouncedValue),
    queryFn: () => api.tags.getTagSearch(debouncedValue),
    keepPreviousData: true,
    enabled: !!debouncedValue,
  });
  return { autoCompletedTags: data?.tags, ...rest };
};

/**
 * @desc
 * Navigation Drawer (SideBar) 카테고리/태그
 */
export const useGetCategoryWithTag = <T>({
  select,
}: {
  select: QuerySelectOption<T, typeof api.tags.getCategoryWithTags>;
}) =>
  useSuspendedQuery({
    queryKey: QUERY_KEYS.getCategoryWithTags,
    queryFn: api.tags.getCategoryWithTags,
    select,
  });

export const useGetMemeTagsById = (id: string) => {
  const { data, ...rest } = useSuspendedQuery({
    queryKey: QUERY_KEYS.getMemeTagsById(id),
    queryFn: () => api.tags.getMemeTagsById(id),
    staleTime: Infinity,
  });
  return { ...data, ...rest };
};

export const fetchMemeTagsById = (id: string, queryClient: QueryClient) =>
  queryClient.fetchQuery(QUERY_KEYS.getMemeTagsById(id), () => api.tags.getMemeTagsById(id));

export const useGetTagInfo = (tagId: number) => {
  return useSuspendedQuery({
    queryKey: QUERY_KEYS.getTagInfo(tagId),
    queryFn: () => api.tags.getTagInfo(tagId),
  }).data;
};

export const fetchTagInfo = (tagId: number, queryClient: QueryClient) =>
  queryClient.fetchQuery(QUERY_KEYS.getTagInfo(tagId), () => api.tags.getTagInfo(tagId));

export const usePostFavoriteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.tags.postFavoriteTag,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.getTagInfo(id) });
      const previousTagInfo = queryClient.getQueryData(QUERY_KEYS.getTagInfo(id)) as Awaited<
        ReturnType<typeof api.tags.getTagInfo>
      >;

      queryClient.setQueryData(QUERY_KEYS.getCategoryWithTags, (old) => {
        const newCategory = (
          old as Awaited<ReturnType<typeof api.tags.getCategoryWithTags>>
        ).categories.map((category) => ({
          ...category,
          tags: category.tags.map((tag) => (tag.tagId === id ? { ...tag, isFav: true } : tag)),
        }));

        return { categories: newCategory };
      });

      queryClient.setQueryData(QUERY_KEYS.getTagInfo(id), (old) => ({
        ...(old as Awaited<ReturnType<typeof api.tags.getCategoryWithTags>>),
        isFav: true,
      }));

      return { previousTagInfo };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(QUERY_KEYS.getTagInfo(id), context?.previousTagInfo);
    },
  });
};

export const useDeleteFavoriteTag = (wait = 0) => {
  const queryClient = useQueryClient();

  const controller = new AbortController();

  const mutation = useMutation({
    mutationFn: (id: number) => api.tags.deleteFavoriteTag(id, controller.signal),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.getCategoryWithTags });
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.getTagInfo(id) });

      const previousCategory = queryClient.getQueryData(QUERY_KEYS.getCategoryWithTags);
      const previousTagInfo = queryClient.getQueryData(QUERY_KEYS.getTagInfo(id)) as Awaited<
        ReturnType<typeof api.tags.getTagInfo>
      >;

      queryClient.setQueryData(QUERY_KEYS.getCategoryWithTags, (old) => {
        const newCategory = (
          old as Awaited<ReturnType<typeof api.tags.getCategoryWithTags>>
        ).categories.map((category) => ({
          ...category,
          tags: category.tags.map((tag) => (tag.tagId === id ? { ...tag, isFav: false } : tag)),
        }));

        return { categories: newCategory };
      });

      queryClient.setQueryData(QUERY_KEYS.getTagInfo(id), (old) => ({
        ...(old as Awaited<ReturnType<typeof api.tags.getCategoryWithTags>>),
        isFav: false,
      }));

      await delay(wait);
      return { previousCategory, previousTagInfo };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(QUERY_KEYS.getCategoryWithTags, context?.previousCategory);
      queryClient.setQueryData(QUERY_KEYS.getTagInfo(id), context?.previousTagInfo);
    },
  });
  return { ...mutation, onCancel: () => controller.abort() };
};
