export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getPopularMemes: ["getPopularMemes"],
  getMemesByCollectionId: (collectionId: number | null) => ["getMemesByCollectionId", collectionId],
} as const;
