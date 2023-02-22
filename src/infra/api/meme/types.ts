import type { Meme } from "@/types";

export interface GetMemesByCollectionIdResponse {
  memes: Meme[];
  count: number;
}

export type GetMemeDetailByIdResponse = Meme;
