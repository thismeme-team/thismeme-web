import type { AxiosInstance } from "axios";

import type { GetMemesResponse } from "../search/types";
import type { GetMemeDetailByIdResponse, GetMemesByCollectionIdResponse } from "./types";

export class MemeApi {
  constructor(private api: AxiosInstance) {}

  getMemeDetailById = (id: string) => {
    return this.api
      .get<GetMemeDetailByIdResponse>(`/memes/${id}`)
      .then((response) => response.data);
  };

  /**
   * NOTE
   * 인기밈 가져오기 api의 경우 server api에서 가져와야 하므로 우선 meme 파일 내에 둠.
   */
  getPopularMemes = async ({ offset, limit }: { offset: number; limit: number }) => {
    const page = offset / limit;

    const { data } = await this.api.get<GetMemesResponse>(`/memes`, {
      params: {
        page,
        size: limit,
        sort: "viewCount,desc",
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

  /**
   * 콜렉션 별 밈 리스트 API
   * endpoint에 board에서 collection 으로 변경할 예정
   */
  getMemesByCollectionId = async ({
    collectionId,
    offset,
    limit,
  }: {
    collectionId: string;
    offset: number;
    limit: number;
  }) => {
    const page = offset / limit;

    const { data } = await this.api.get<GetMemesByCollectionIdResponse>(
      `/memes/boards/${collectionId}`,
      {
        params: {
          page,
          size: limit,
        },
      },
    );
    const result = {
      data: data.memes,
      offset: offset,
      limit: limit,
      isLastPage: data.memes.length < limit,
      isFirstPage: offset >= 0 && offset < limit,
    };
    return result;
  };

  postMemeToCollection = (memeId: string) => {
    return this.api.post(`/memes/${memeId}/board`).then((response) => response.data);
  };
}
