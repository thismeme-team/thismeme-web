import type { AxiosInstance } from "axios";

import type {
  GetCategoryByTagResponse,
  GetFavoriteTagsResponse,
  GetMemeTagsByIdResponse,
  GetPopularTagsResponse,
  GetTagInfoResponse,
} from "./types";

export class TagApi {
  constructor(private api: AxiosInstance) {}

  getTagSearch = (value: string) => {
    if (value === "") {
      /**
       * NOTE
       * throw를 사용 하면 return type에 Error 객체가 포함되지 않아, 사용하는 쪽에서 추가 분기 처리가 필요하지 않습니다
       * 또한 onError callback이 정상적으로 동작 가능하게 합니다
       *
       * return 사용 시 value가 없으므로 초기에 react query cache에 Error 객체가 들어갑니다
       * 또한 onError가 아니라 onSuccess callback이 실행되어 의도하지 않는 동작이 일어날 수 있습니다
       */
      throw new Error("No Query");
    }
    //NOTE : api response에 categoryName 없음 check
    return this.api
      .get("/tags/search", {
        params: {
          word: value,
        },
      })
      .then((response) => response.data);
  };

  getPopularTags = () => {
    return this.api.get<GetPopularTagsResponse>(`/tags/rank/new`).then((response) => response.data);
  };

  getMemeTagsById = (id: string) => {
    return this.api
      .get<GetMemeTagsByIdResponse>(`/tags/memes/${id}`)
      .then((response) => response.data);
  };

  getCategoryWithTags = () => {
    return this.api
      .get<GetCategoryByTagResponse>("/tags/categories/new")
      .then((response) => response.data);
  };

  getTagInfo = (tagId: number) => {
    return this.api.get<GetTagInfoResponse>(`/tags/${tagId}`).then((response) => response.data);
  };

  getFavoriteTags = () => {
    return this.api.get<GetFavoriteTagsResponse>("/tags/favs").then((response) => response.data);
  };

  postFavoriteTag = ({ tagId, name }: { tagId: number; name: string }) => {
    return this.api.post(`/tags/${tagId}/fav`).then((response) => response.data);
  };

  deleteFavoriteTag = (tagId: number, signal?: AbortSignal) => {
    return this.api.delete(`tags/${tagId}/fav`, { signal }).then((response) => response.data);
  };
}
