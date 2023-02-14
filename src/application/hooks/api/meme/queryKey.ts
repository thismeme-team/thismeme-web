export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getPopularMemes: ["getPopularMemes"],
  getMemesByCollectionId: (collectionId: string) => ["getMemesByCollectionId", collectionId],
} as const;
