export const QUERY_KEYS = {
  getSearchResultsByKeyword: (keyword: string) => ["getSearchResultsByKeyword", keyword],
  getSearchResultsByTag: (tag: string) => ["getSearchResultsByTag", tag],
} as const;
