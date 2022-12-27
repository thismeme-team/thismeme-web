import { useQuery } from "@tanstack/react-query";

import { api } from "@/infra/api";

export const useMemeDetailById = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["meme", id],
    queryFn: () => api.meme.getMemeDetailById(id),
    enabled: !!id,
  });

  return { ...data, ...rest };
};
