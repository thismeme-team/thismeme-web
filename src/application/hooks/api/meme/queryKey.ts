export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getMemesBySort: (sort: string) => ["@memeList/getMemesBySort", sort],
  getMemesByCollectionId: (collectionId: number | null) => [
    "@memeList/getMemesByCollectionId",
    collectionId,
  ],
} as const;
