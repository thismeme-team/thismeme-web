import type { AxiosInstance } from "axios";

export class TagApi {
  constructor(private api: AxiosInstance) {}

  getPopularTag = () => {
    return this.api.get(`tags?size=4&sort=viewCount,desc`).then((response) => response.data);
  };
}
