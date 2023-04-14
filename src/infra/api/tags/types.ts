export interface Tag {
  tagId: number;
  name: string;
  viewCount: number;
  categoryId: number;
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
  tags: (Pick<Tag, "tagId" | "name" | "viewCount"> & { isFav: boolean })[];
}

export interface GetCategoryByTagResponse {
  maincategories: {
    mainCategoryId: number;
    name: string;
    icon: string;
    priority: number;
    hasSub: boolean;
    categories: {
      categories: Category[];
    };
  }[];
}

export type GetTagInfoResponse = Tag & { isFav: boolean };
