import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { isAxiosError } from "axios";

import { IS_CSR } from "@/application/util";
import type { RefreshResponse } from "@/infra/api/auth/types";

export class AuthApi {
  constructor(private api: AxiosInstance) {
    if (!IS_CSR) return;
    this.setRequestAgainInterceptor(api);
  }

  private setRequestAgainInterceptor = (api: AxiosInstance) => {
    /**
     * @desc
     *  401 에러 시 토큰 갱신 후 이전 api 재요청 합니다
     *  이외 상태코드 또는 이미 재요청 한 api일 경우 오류를 반환합니다
     *
     *  refresh api가 401을 반환하면 재로그인을 해야 합니다
     *  - 오류 반환 후, 유저 정보를 불러오는 useGetMyAccount 에서 setQueryData null 로 처리
     */
    api.interceptors.response.use(null, async (error) => {
      if (!isAxiosError(error)) return Promise.reject(error);

      const status = Number(error.response?.status);
      const origin = error.config as AxiosRequestConfig;

      if (origin.url === "/token/refresh" && status === 401) return Promise.reject(error);

      if (status !== 401 || origin.headers?.retry) return Promise.reject(error);

      const token = await this.refresh();
      return api({
        ...origin,
        headers: { ...origin.headers, authorization: `Bearer ${token}`, retry: true },
      });
    });
  };

  getAccessToken = () =>
    this.api.defaults.headers.common["Authorization"]?.toString().split(" ").at(-1);

  setAccessToken = (token: string) => {
    this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  deleteAccessToken = () => {
    delete this.api.defaults.headers.common["Authorization"];
  };

  logout = () => {
    const accessToken = this.getAccessToken();

    return this.api.post(`/token/blacklist`, { accessToken });
  };

  refresh = async () => {
    const accessToken = this.getAccessToken();

    const { data } = await this.api.post<RefreshResponse>(`/token/refresh`, { accessToken });

    this.setAccessToken(data.accessToken);
    return data.accessToken;
  };
}
