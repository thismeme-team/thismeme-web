import type { AxiosInstance } from "axios";

import type { Meme } from "@/types";

export class MemeApi {
  constructor(private api: AxiosInstance) {}

  getMemeDetailById = (id: string) => {
    return this.api.get<Meme>(`/meme/${id}`).then(({ data }) => data);
  };
}
