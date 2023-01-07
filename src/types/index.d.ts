export interface Tag {
  tagId: number;
  name: string;
  categoryName: string;
  viewCount: number;
}

export interface SearchKeyword {
  id: number;
  text: string;
}

export interface PaginationResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}
/**
 * FIX camel-case로 변환하는 API 스키마 필요
 */
export interface SearchResult {
  id: number;
  title: string;
  image_url: string;
  image_width: number;
  image_height: number;
  tags: string[];
  view_count: number;
  share_count: number;
  create_date: string;
  modified_date: string;
}

export interface Meme {
  memeId: number;
  name: string;
  description: string;
  viewCount: number;
  shareCount: number;

  createDate: string;
  modifiedDate: string;

  // TODO Image interface 정의 필요
  image: {
    images: {
      imageId: number;
      imageUrl: string;
      width: number;
      height: number;
    }[];
    count: number;
  };

  tags?: string[];
  author?: string;
}
