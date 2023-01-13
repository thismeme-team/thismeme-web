import { useSuspendedQuery } from "@/application/hooks/api/core";
import { api } from "@/infra/api";

import { QUERY_KEYS } from "./queryKey";

/**
 * 밈 상세 조회 API
 * @param id 상세 조회할 밈 id
 */
export const useMemeDetailById = (id: string) => {
  const { data, ...rest } = useSuspendedQuery({
    queryKey: QUERY_KEYS.getMemeDetailById(id),
    queryFn: () => api.meme.getMemeDetailById(id),
  });

  return { ...data, ...rest };
};

export const useGetMemeTagsById = (id: string) => {
  const { data, ...rest } = useSuspendedQuery({
    queryKey: QUERY_KEYS.getMemeTagsById(id),
    queryFn: () => api.tags.getMemeTagsById(id),
  });
  return { ...data, ...rest };
};
