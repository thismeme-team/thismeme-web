export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getPopularMemes: ["getPopularMemes"],
  getSharedMemes: ["getSharedMemes"],
  getRecentMemes: ["getRecentMemes"],
} as const;
