import type { AxiosInstance } from "axios";

import type { GetMemesResponse } from "@/types";

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
    const response = await this.api.get<GetMemesResponse>("/search", {
      params: {
        keyword,
        offset,
        limit,
      },
    });
    return response.data;
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
    const response = await this.api.get<GetMemesResponse>("/search/tag", {
      params: {
        keyword,
        offset,
        limit,
      },
    });
    return response.data;
  };

  getMemesFromCollectionByKeyword = async ({
    collectionId,
    keyword,
    offset,
    limit,
  }: {
    collectionId: number;
    keyword: string;
    offset: number;
    limit: number;
  }) => {
    const response = await this.api.get<GetMemesResponse>(`/search/collection/${collectionId}`, {
      params: {
        keyword,
        offset,
        limit,
      },
    });
    return response.data;
  };

  getUserFindMemes = async ({
    userId,
    keywords,
    offset,
    limit,
  }: {
    userId: string;
    keywords: string;
    offset: number;
    limit: number;
  }) => {
    const response = await this.api.get<GetMemesResponse>(`/search/user/${userId}`, {
      params: {
        keywords,
        offset,
        limit,
      },
    });
    return response.data;
  };
}
