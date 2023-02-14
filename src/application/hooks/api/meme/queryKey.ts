export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getPopularMemes: ["getPopularMemes"],
  getMemesByType: (type: string) => ["getMemesByType", type],
  getSharedMemes: ["getSharedMemes"],
  getRecentMemes: ["getRecentMemes"],
} as const;
