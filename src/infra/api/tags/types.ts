export interface Tag {
  tagId: number;
  name: string;
  viewCount: number;
  categoryId: number;
  isFav: boolean;
  categoryName: string;
  imageUrl: string;
}

export interface GetPopularTagsResponse {
  tags: Omit<Tag, "isFav">[];
  count: number;
}

export interface GetTagSearchResponse {
  tags: Pick<Tag, "tagId" | "name" | "viewCount">[];
}

export interface GetMemeTagsByIdResponse {
  tags: Omit<Tag, "isFav" | "imageUrl">[];
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

export type GetTagInfoResponse = Omit<Tag, "imageUrl">;
export type GetFavoriteTagsResponse = Pick<Category, "tags">;
