interface Tag {
  tagId: number;
  name: string;
  viewCount: number;
  categoryId: number;
  categoryName: string;
}

export interface GetPopularTagsResponse {
  tags: Tag[];
}

export interface GetTagSearchResponse {
  tags: Pick<Tag, "tagId" | "name" | "viewCount">[];
}

export interface GetMemeTagsByIdResponse {
  tags: Tag[];
}
