import type { Meme } from "@/types";

export type GetMemeDetailByIdResponse = Meme;

export interface GetMemesByCollectionIdResponse {
  memes: Meme[];
  count: number;
}
