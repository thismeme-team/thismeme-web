import type { AxiosInstance } from "axios";

import { IS_CSR, safeLocalStorage } from "@/application/util";
import type { RefreshResponse } from "@/infra/api/auth/types";

const ACCESS_TOKEN_KEY = "accessToken";

export class AuthApi {
  constructor(private api: AxiosInstance) {
    if (!IS_CSR) return;

    const token = safeLocalStorage.get(ACCESS_TOKEN_KEY);
    if (token) this.setAccessToken(token);
  }

  getAccessToken = () => safeLocalStorage.get(ACCESS_TOKEN_KEY);

  setAccessToken = (token: string) => {
    safeLocalStorage.set(ACCESS_TOKEN_KEY, token);
    this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  deleteAccessToken = () => {
    safeLocalStorage.set(ACCESS_TOKEN_KEY, "");
    delete this.api.defaults.headers.common["Authorization"];
  };

  logout = () => {
    const accessToken = this.getAccessToken();

    return this.api.post(`/token/blacklist`, { accessToken }).then(this.deleteAccessToken);
  };

  refresh = () => {
    const accessToken = this.getAccessToken();

    return this.api
      .post<RefreshResponse>(`/token/refresh`, { accessToken }, { withCredentials: true })
      .then((res) => this.setAccessToken(res.data.accessToken));
  };
}
