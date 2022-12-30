import type { AxiosInstance } from "axios";

export class TagApi {
  constructor(private api: AxiosInstance) {}

  getPopularTag = () => {
    return this.api.get(`/tags/popular`).then((response) => response.data);
  };
}
