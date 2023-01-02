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
export interface SearchResultByKeyword {
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

export interface SearchResultByTag {
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
  id: number;
  src: string;
  title: string;
  description: string;
  views: number;
  date: string;
  tags: string[];
  author: string;
  share: number;
}
