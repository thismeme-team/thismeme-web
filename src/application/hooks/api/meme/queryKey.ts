export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getMemeTagsById: (id: string) => ["getMemeTagsById", id],
} as const;
