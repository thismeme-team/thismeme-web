export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getSharedMemes: ["getSharedMemes"],
  getRecentMemes: ["getRecentMemes"],
  getMemesBySort: (sort: string) => ["getMemesByOption", sort],
} as const;
