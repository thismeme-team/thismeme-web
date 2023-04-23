export interface Tag {
  tagId: number;
  name: string;
  viewCount: number;
  categoryId: number;
  isFav?: boolean;
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

export interface Category {
  categoryId: number;
  name: string;
  priority: number;
  tags: Pick<Tag, "tagId" | "name" | "isFav">[];
}

export interface GetCategoryByTagResponse {
  mainCategories: {
    mainCategoryId: number;
    name: string;
    icon: string;
    priority: number;
    hasSub: boolean;
    categories: Category[];
  }[];
  mainTags: Pick<Tag, "tagId" | "name">[][];
}

export type GetTagInfoResponse = Tag & { isFav: boolean };
export type GetFavoriteTagsResponse = Pick<Category, "tags">;
