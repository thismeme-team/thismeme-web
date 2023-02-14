export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getPopularMemes: ["getPopularMemes"],
  getMemesByType: (type: string) => ["getMemesByType", type],
} as const;
