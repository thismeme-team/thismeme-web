import { useSuspendedQuery } from "@/application/hooks/api/core";
import { api } from "@/infra/api";

import { QUERY_KEYS } from "./queryKey";

export const useMemeDetailById = (id: string) => {
  const { data, ...rest } = useSuspendedQuery({
    queryKey: QUERY_KEYS.getMemeDetailById(id),
    queryFn: () => api.meme.getMemeDetailById(id),
  });

  return { ...data, ...rest };
};
