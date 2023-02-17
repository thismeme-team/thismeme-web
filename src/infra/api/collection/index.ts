import type { AxiosInstance } from "axios";

import type { GetCollectionCheckResponse } from "./types";

export class CollectionApi {
  constructor(private api: AxiosInstance) {}

  /**
   * NOTE
   * 임시: 밈별 콜렉션 정보 API
   * 백엔드에 밈별 콜렉션 정보 API 인터페이스 요청하기
   */
  getCollectionCheck = (memeId: number) => {
    return this.api
      .get<GetCollectionCheckResponse>(`/collections/check/memes/${memeId}`)
      .then((response) => response.data);
  };

  /**
   * 콜렉션 삭제 API
   */
  deleteMemeFromCollection = (memeId: number) => {
    return this.api.delete(`/collections/memes/${memeId}`).then((response) => response.data);
  };

  /**
   * 콜렉션 저장 API
   */
  postMemeToCollection = (memeId: number) => {
    return this.api.post(`/collections/memes/${memeId}`).then((response) => response.data);
  };
}
