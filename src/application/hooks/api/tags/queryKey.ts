export const QUERY_KEYS = {
  getPopularTags: ["getPopularTags"],
  getTagSearch: (debouncedValue: string) => ["getTagSearch", debouncedValue],
} as const;
