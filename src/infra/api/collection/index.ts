import type { AxiosInstance } from "axios";

import type { GetCollectionCheckResponse } from "./types";

export class CollectionApi {
  constructor(private api: AxiosInstance) {}

  /**
   * 밈별 콜렉션 정보 API
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

  /**
   * 공유 콜렉션 저장 API
   */
  postMemeToSharedCollection = (memeId: number) => {
    return this.api.post(`/collections/share/memes/${memeId}`).then((response) => response.data);
  };
}
