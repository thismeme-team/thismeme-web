import axios from "axios";

import { AccountApi } from "@/infra/api/account";
import { AuthApi } from "@/infra/api/auth";
import { CollectionApi } from "@/infra/api/collection";
import { MemeApi } from "@/infra/api/meme";
import { SearchApi } from "@/infra/api/search";
import { TagApi } from "@/infra/api/tags";

export const axiosBasic = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
});

/**
 * FIX
 * 검색 API만 서버 endpoint가 다름.
 * 추후에 다른 API와 endpoint 통일될 예정.
 */
export const axiosSearchBasic = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SEARCH_API_URL}`,
});

/**
 * NOTE
 *  통신 클라이언트(axios) 의존성 주입
 *  private/public 으로 api 요청 정책이 분리될 가능성을 위함
 *  특정 정책에 따라 여러 버전의 api 인스턴스를 런타임에 생성 가능
 *
 * TODO
 *  1. 요청 데이터를 검증하는 방법과 위치 및 에러 핸들링
 *  2. 응답 에러 핸들링
 */
export const api = {
  auth: new AuthApi(axiosBasic),
  account: new AccountApi(axiosBasic),
  search: new SearchApi(axiosSearchBasic),
  meme: new MemeApi(axiosBasic),
  tags: new TagApi(axiosBasic),
  collection: new CollectionApi(axiosBasic),
};
