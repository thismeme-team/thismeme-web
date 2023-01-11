import type { AxiosInstance } from "axios";

import type { MemesResponse, PaginationResponse } from "./types";

export class SearchApi {
  constructor(private api: AxiosInstance) {}

  getMemesByKeyword = async ({
    keyword,
    offset,
    limit,
  }: {
    keyword: string;
    offset: number;
    limit: number;
  }): Promise<PaginationResponse<MemesResponse["memes"]>> => {
    const { data } = await this.api.get<MemesResponse>("/search", {
      params: {
        keyword,
        offset,
        limit,
      },
    });
    const result = {
      data: data.memes,
      offset: offset,
      limit: limit,
      isLastPage: data.count < limit,
      isFirstPage: offset >= 0 && offset < limit,
    };
    return result;
  };

  getMemesByTag = async ({
    keyword,
    offset,
    limit,
  }: {
    keyword: string;
    offset: number;
    limit: number;
  }): Promise<PaginationResponse<MemesResponse["memes"]>> => {
    const { data } = await this.api.get<MemesResponse>("/search/tag", {
      params: {
        keyword,
        offset,
        limit,
      },
    });
    const result = {
      data: data.memes,
      offset: offset,
      limit: limit,
      isLastPage: data.count < limit,
      isFirstPage: offset === 0,
    };
    return result;
  };
}
