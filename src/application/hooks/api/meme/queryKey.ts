export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getMemesBySort: (sort: string) => ["getMemesBySort", sort],
  getMemesByCollectionId: (collectionId: number | null) => ["getMemesByCollectionId", collectionId],
} as const;
