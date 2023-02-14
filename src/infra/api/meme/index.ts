import type { AxiosInstance } from "axios";

import type { GetMemesResponse } from "../search/types";
import type { GetMemeDetailByIdResponse } from "./types";

export class MemeApi {
  constructor(private api: AxiosInstance) {}

  getMemeDetailById = (id: string) => {
    return this.api
      .get<GetMemeDetailByIdResponse>(`/memes/${id}`)
      .then((response) => response.data);
  };

  /* NOTE
  인기밈 가져오기 api의 경우 server api에서 가져와야 하므로 우선 meme 파일 내에 둠.
  currentpage 는 pageparam(offset) / limit 로 계산
  */
  getPopularMemes = async ({ offset, limit }: { offset: number; limit: number }) => {
    const currentpage = offset / limit;

    const { data } = await this.api.get<GetMemesResponse>(
      `/memes?page=${currentpage}&size=${limit}&sort=viewCount,desc`,
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

  getMemesByType = async ({
    offset,
    limit,
    option,
  }: {
    offset: number;
    limit: number;
    option: string;
  }) => {
    const currentpage = offset / limit;

    const { data } = await this.api.get<GetMemesResponse>(
      `/memes?page=${currentpage}&size=${limit}&sort=${option},desc`,
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
}
