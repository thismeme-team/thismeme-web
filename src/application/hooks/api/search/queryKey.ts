export const QUERY_KEYS = {
  getMemesByKeyword: (keyword: string) => ["getMemesByKeyword", keyword],
  getMemesByTag: (tag: string) => ["getMemesByTag", tag],
} as const;
