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
  page 를 계속 넣어주어야 하므로 currentpage 도 받아옴.
  */
  getPopularMemes = async ({
    currentpage,
    offset,
    limit,
  }: {
    currentpage: number;
    offset: number;
    limit: number;
  }) => {
    const { data } = await this.api.get<GetMemesResponse>(
      `/memes?page=${currentpage}&size=${limit}&sort=viewCount,desc`,
    );
    const result = {
      data: data.memes,
      currentpage: currentpage,
      offset: offset,
      limit: limit,
      isLastPage: data.memes.length < limit,
      isFirstPage: offset >= 0 && offset < limit,
    };
    return result;
  };
}
