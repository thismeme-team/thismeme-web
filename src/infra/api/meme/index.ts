import type { AxiosInstance } from "axios";

import type { GetMemesResponse } from "@/types";

import type { GetMemeDetailByIdResponse, GetMemesByCollectionIdResponse } from "./types";

export class MemeApi {
  constructor(private api: AxiosInstance) {}

  getMemeDetailById = (id: string) => {
    return this.api
      .get<GetMemeDetailByIdResponse>(`/memes/${id}`)
      .then((response) => response.data);
  };

  /**
   * 콜렉션 별 밈 목록 API
   */
  getMemesByCollectionId = async ({
    collectionId,
    offset,
    limit,
  }: {
    collectionId: number;
    offset: number;
    limit: number;
  }) => {
    const page = offset / limit;

    const response = await this.api.get<GetMemesByCollectionIdResponse>(
      `/memes/collections/${collectionId}`,
      {
        params: {
          page,
          size: limit,
          sort: "id,desc",
        },
      },
    );
    return response.data;
  };

  getMemesBySort = async ({
    offset,
    limit,
    sort,
  }: {
    offset: number;
    limit: number;
    sort: string;
  }) => {
    const page = offset / limit;

    const response = await this.api.get<GetMemesResponse>(`/memes`, {
      params: {
        page,
        size: limit,
        sort: `${sort},desc`,
      },
    });
    return response.data;
  };
}
