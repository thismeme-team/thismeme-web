export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getPopularMemes: ["getPopularMemes"],
  getUserSharedMemes: ["getUserSharedMemes"],
} as const;
