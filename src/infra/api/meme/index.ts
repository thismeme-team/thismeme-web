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

  /*NOTE 회원이 공유한 밈 api collection url 로 수정 */
  getUserSharedMemes = async ({ offset, limit }: { offset: number; limit: number }) => {
    const currentpage = offset / limit;

    const { data } = await this.api.get<GetMemesResponse>(
      `/user/memes?page=${currentpage}&size=${limit}&sort=shareCount,desc`,
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

  getMemesBySort = async ({
    offset,
    limit,
    sort,
  }: {
    offset: number;
    limit: number;
    sort: string;
  }) => {
    const currentpage = offset / limit;

    const { data } = await this.api.get<GetMemesResponse>(
      `/memes?page=${currentpage}&size=${limit}&sort=${sort},desc`,
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

  /*
  NOTE 회원이 찾는 밈 api 다른 브랜치에서 작업함
  */
  getUserFindMemes = async ({ offset, limit }: { offset: number; limit: number }) => {
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
}
