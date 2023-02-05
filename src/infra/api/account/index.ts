import type { AxiosInstance } from "axios";

import type { GetMyAccountResponse } from "./types";

export class AccountApi {
  constructor(private api: AxiosInstance) {}

  getMyAccount = () =>
    this.api.get<GetMyAccountResponse>("/accounts/me").then((response) => response.data);
}
