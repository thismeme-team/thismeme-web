export const QUERY_KEYS = {
  getMemesByKeyword: (keyword: string) => ["getMemesByKeyword", keyword],
  getMemesByTag: (tag: string) => ["getMemesByTag", tag],
  getMemesFromCollectionByKeyword: ({
    keyword,
    collectionId,
  }: {
    keyword: string;
    collectionId: number;
  }) => ["getMemesFromCollectionByKeyword", { keyword, collectionId }],
  getUserFindMemes: (keywords: string) => ["getUserFindMemes", keywords],
} as const;
