export const QUERY_KEYS = {
  getPopularTags: ["getPopularTags"],
  getTagSearch: (debouncedValue: string) => ["getTagSearch", debouncedValue],
  getCategoryWithTags: ["getCategoryWithTags"],
  getMemeTagsById: (id: string) => ["getMemeTagsById", id],
  getTagInfo: (tagId: number) => ["getTagInfo", tagId],
} as const;
