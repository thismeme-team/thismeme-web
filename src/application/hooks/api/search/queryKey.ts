export const QUERY_KEYS = {
  getMemesByKeyword: (keyword: string) => ["@memeList/getMemesByKeyword", keyword],
  getMemesByTag: (tag: string) => ["@memeList/getMemesByTag", tag],
  getMemesFromCollectionByKeyword: ({
    keyword,
    collectionId,
  }: {
    keyword: string;
    collectionId: number;
  }) => ["@memeList/getMemesFromCollectionByKeyword", { keyword, collectionId }],
  getUserFindMemes: (keywords: string) => ["@memeList/getUserFindMemes", keywords],
} as const;
