import type { AxiosInstance } from "axios";

import type { GetMemeDetailByIdResponse } from "./types";

export class MemeApi {
  constructor(private api: AxiosInstance) {}

  getMemeDetailById = (id: string) => {
    return this.api
      .get<GetMemeDetailByIdResponse>(`/memes/${id}`)
      .then((response) => response.data);
  };
}
