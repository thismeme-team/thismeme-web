import type { Meme } from "@/types";

export interface GetMemesResponse {
  memes: Meme[];
  /**
   * memes의 개수
   */
  count: number;
}

export interface PaginationResponse<T> {
  data: T;
  offset: number;
  limit: number;
  isLastPage: boolean;
  isFirstPage: boolean;
}
