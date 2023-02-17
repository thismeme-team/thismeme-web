import type { QueryClient } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useDebounce } from "@/application/hooks";
import { useSuspendedQuery } from "@/application/hooks/api/core";
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
  select: (data: Awaited<ReturnType<typeof api.tags.getCategoryWithTags>>) => T;
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

export const useDeleteFavoriteTag = (wait = 0) => {
  const queryClient = useQueryClient();

  const controller = new AbortController();

  const mutation = useMutation({
    mutationFn: (id: number) => api.tags.deleteFavoriteTag(id, controller.signal),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.getCategoryWithTags });

      const previousCategory = queryClient.getQueryData(QUERY_KEYS.getCategoryWithTags);

      /**
       * @desc
       *  Query Cache에 담긴 데이터가 unknown 이므로 타입 단언 사용
       *  좀 더 좋은 타입 추론 방법이 없을지..?
       */

      queryClient.setQueryData(QUERY_KEYS.getCategoryWithTags, (old) => {
        const newCategory = (
          old as Awaited<ReturnType<typeof api.tags.getCategoryWithTags>>
        ).categories.map((category) => ({
          ...category,
          tags: category.tags.filter((tag) => tag.tagId !== id),
        }));
        return { categories: newCategory };
      });

      await delay(wait);
      return { previousCategory };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(QUERY_KEYS.getCategoryWithTags, context?.previousCategory);
    },

    // NOTE: 실제 즐겨찾기 삭제 api가 아직 개발 중이므로 재검증 로직 주석 처리
    // onSettled: () => {
    //   queryClient.invalidateQueries(QUERY_KEYS.getCategoryWithTags);
    // },
  });
  return { ...mutation, onCancel: () => controller.abort() };
};

export const fetchTagInfo = (tagId: number, queryClient: QueryClient) =>
  queryClient.fetchQuery(QUERY_KEYS.getTagInfo(tagId), () => api.tags.getTagInfo(tagId));
