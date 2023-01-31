import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { isAxiosError } from "axios";

import { IS_CSR, safeLocalStorage } from "@/application/util";
import type { RefreshResponse } from "@/infra/api/auth/types";

const ACCESS_TOKEN_KEY = "accessToken";

export class AuthApi {
  constructor(private api: AxiosInstance) {
    if (!IS_CSR) return;

    const token = safeLocalStorage.get(ACCESS_TOKEN_KEY);
    if (token) this.setAccessToken(token);

    this.api.interceptors.response.use(null, async (error) => {
      if (!isAxiosError(error)) return Promise.reject(error);

      const status = error.response?.status;
      const origin = error.config as AxiosRequestConfig;

      if (Number(status) !== 401 || origin.headers?.retry) return Promise.reject(error);

      const token = await this.refresh();
      return this.api({
        ...origin,
        headers: { ...origin.headers, authorization: `Bearer ${token}`, retry: true },
      });
    });
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

  refresh = async () => {
    const accessToken = this.getAccessToken();

    const { data } = await this.api.post<RefreshResponse>(
      `/token/refresh`,
      { accessToken },
      { withCredentials: true },
    );

    this.setAccessToken(data.accessToken);
    return data.accessToken;
  };
}
