export const QUERY_KEYS = {
  getCollectionCheck: (memeId: number) => ["getCollectionCheck", memeId],
  getMemesByCollectionId: (collectionId: number | null) => ["getMemesByCollectionId", collectionId],
} as const;
