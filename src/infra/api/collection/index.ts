import type { AxiosInstance } from "axios";

export class CollectionApi {
  constructor(private api: AxiosInstance) {}

  postMemeToSharedCollection = (memeId: number) => {
    return this.api.post(`/collections/share/memes/${memeId}`).then((response) => response.data);
  };
}
