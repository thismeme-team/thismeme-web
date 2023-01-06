import { useSuspendedQuery } from "@/application/hooks/api/core";
import { api } from "@/infra/api";

export const useMemeDetailById = (id: string) => {
  const { data, ...rest } = useSuspendedQuery({
    queryKey: ["meme", id],
    queryFn: () => api.meme.getMemeDetailById(id),
  });

  return { ...data, ...rest };
};
