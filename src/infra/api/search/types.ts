import type { Meme } from "@/types";

export interface GetMemesResponse {
  memes: Meme[];
  /**
   * memes의 개수
   */
  count: number;
}
