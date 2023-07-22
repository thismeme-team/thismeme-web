import { useQuery } from "@tanstack/react-query";

import type { QuerySelectOption } from "../core";
import { api } from "../core";

/**
 * @desc
 * Tag Category 에 즐겨찾기를 제외한 태그들
 */
export const useGetCategoryWithTag = <T>({
  select,
}: {
  select: QuerySelectOption<T, typeof api.tags.getCategoryWithTags>;
}) =>
  useQuery({
    queryKey: useGetCategoryWithTag.queryKey,
    queryFn: useGetCategoryWithTag.queryFn,
    select,
  });

useGetCategoryWithTag.queryKey = ["getCategoryWithTags"] as const;

useGetCategoryWithTag.queryFn = () => api.tags.getCategoryWithTags();
