import type { AxiosInstance } from "axios";

import type { GetMemesResponse } from "./types";

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
  }) => {
    const { data } = await this.api.get<GetMemesResponse>("/search", {
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
      isLastPage: data.memes.length < limit,
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
  }) => {
    const { data } = await this.api.get<GetMemesResponse>("/search/tag", {
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
      isLastPage: data.memes.length < limit,
      isFirstPage: offset >= 0 && offset < limit,
    };
    return result;
  };
}
