import type { AxiosInstance } from "axios";

export class TagApi {
  constructor(private api: AxiosInstance) {}

  //NOTE : 태그의 개수 유동적으로 가져오는 것인지 check
  getPopularTag = () => {
    return this.api.get(`/tags?size=5&sort=viewCount,desc`).then((response) => response.data);
  };
}
