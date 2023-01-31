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

    /**
     * @desc
     *  401 에러 시 토큰 갱신 후 이전 api 재요청 합니다
     *  401 제외 상태코드 또는 이미 재요청 한 api일 경우 오류를 반환합니다
     *
     *  refresh api가 401을 반환하면 재로그인을 해야 합니다
     *  - AT 삭제 후 페이지 강제 리로드로 일단 처리
     */
    this.api.interceptors.response.use(null, async (error) => {
      if (!isAxiosError(error)) return Promise.reject(error);

      const status = error.response?.status;
      const origin = error.config as AxiosRequestConfig;

      if (Number(status) !== 401 || origin.headers?.retry) return Promise.reject(error);

      if (origin.url === "/token/refresh") {
        this.deleteAccessToken();
        location.reload();
        return Promise.reject(error);
      }

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

  // requestAgainTest = () => this.api.post("/token/requestAgainTest");
}
