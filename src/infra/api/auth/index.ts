import type { AxiosInstance } from "axios";

import { IS_CSR } from "@/application/util";
import type { RefreshResponse } from "@/infra/api/auth/types";

export class AuthApi {
  constructor(private api: AxiosInstance) {
    if (!IS_CSR) return;

    try {
      const token = localStorage.getItem("accessToken");
      if (token) this.setAccessToken(token);
    } catch (e) {
      console.error(e);
    }
  }

  setAccessToken = (token: string) => {
    this.api.defaults.headers.common["Authorization"] = token;
  };

  deleteAccessToken = () => {
    delete this.api.defaults.headers.common["Authorization"];
  };

  logout = () => {
    const accessToken = this.api.defaults.headers.common["Authorization"];

    return this.api.post(`/token/blacklist`, { accessToken }).then(this.deleteAccessToken);
  };

  refresh = () => {
    const accessToken = this.api.defaults.headers.common["Authorization"];

    return this.api
      .post<RefreshResponse>(`/token/refresh`, { accessToken }, { withCredentials: true })
      .then((res) => this.setAccessToken(res.data.accessToken));
  };
}
