export const QUERY_KEYS = {
  getMemeDetailById: (id: string) => ["getMemeDetailById", id],
  getMemesBySort: (sort: string) => ["getMemesBySort", sort],
  getUserSharedMemes: ["getUserSharedMemes"],
  getUserFindMemes: ["getUserFindMemes"],
} as const;
