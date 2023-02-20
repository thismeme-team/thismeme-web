export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getMemesBySort: (sort: string) => ["getMemesBySort", sort],
  getUserFindMemes: ["getUserFindMemes"],
  getMemesByCollectionId: (collectionId: number | null) => ["getMemesByCollectionId", collectionId],
} as const;
