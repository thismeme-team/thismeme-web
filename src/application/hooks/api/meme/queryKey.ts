import { CORE_QUERY_KEY } from "@/application/hooks/api/core/queryKey";

export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getMemesBySort: (sort: string) => [CORE_QUERY_KEY.infiniteMemeList, "getMemesBySort", sort],
  getMemesByCollectionId: (collectionId: number | null) => [
    CORE_QUERY_KEY.infiniteMemeList,
    "getMemesByCollectionId",
    collectionId,
  ],
} as const;
