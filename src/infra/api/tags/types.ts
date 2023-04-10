export interface Tag {
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
    icon: string;
    priority: number;
    tags: (Pick<Tag, "tagId" | "name" | "viewCount" | "categoryName"> & { isFav: boolean })[];
  }[];
}

export type GetTagInfoResponse = Tag & { isFav: boolean };
