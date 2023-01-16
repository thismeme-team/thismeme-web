export const QUERY_KEYS = {
  getPopularTags: ["getPopularTags"],
  getTagSearch: (debouncedValue: string) => ["getTagSearch", debouncedValue],
  getCategoryWithTags: ["getCategoryWithTags"],
} as const;
