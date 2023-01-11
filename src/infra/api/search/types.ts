import type { Meme } from "../meme/types";

export interface MemesResponse {
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
