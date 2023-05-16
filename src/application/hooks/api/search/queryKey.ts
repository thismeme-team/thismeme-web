import { CORE_QUERY_KEY } from "@/application/hooks/api/core/queryKey";

export const QUERY_KEYS = {
  getMemesByKeyword: (keyword: string) => [
    CORE_QUERY_KEY.infiniteMemeList,
    "getMemesByKeyword",
    keyword,
  ],
  getMemesByTag: (tag: string) => [CORE_QUERY_KEY.infiniteMemeList, "getMemesByTag", tag],
  getMemesFromCollectionByKeyword: ({
    keyword,
    collectionId,
  }: {
    keyword: string;
    collectionId: number;
  }) => [
    CORE_QUERY_KEY.infiniteMemeList,
    "getMemesFromCollectionByKeyword",
    { keyword, collectionId },
  ],
  getUserFindMemes: (keywords: string) => [
    CORE_QUERY_KEY.infiniteMemeList,
    "getUserFindMemes",
    keywords,
  ],
  getThumbnail: (tag: string) => ["getThumbnail", tag],
} as const;
