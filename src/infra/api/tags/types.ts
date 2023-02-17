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

export interface GetCategoryByTagResponse {
  categories: {
    categoryId: number;
    name: string;
    priority: number;
    tags: Pick<Tag, "tagId" | "name" | "viewCount">[];
  }[];
}

export type GetTagInfoResponse = Tag & { isFav: boolean };
