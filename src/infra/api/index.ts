import { axiosBasic } from "@/infra/api/client";

import { MemeApi } from "./meme";
import { SearchApi } from "./search";
import { TagApi } from "./tags";

/**
 * NOTE
 *  통신 클라이언트(axios) 의존성 주입
 *  private/public 으로 api 요청 정책이 분리될 가능성을 위함
 *  특정 정책에 따라 여러 버전의 api 인스턴스를 런타임에 생성 가능
 *
 * TODO
 *  1. 요청 데이터를 검증하는 방법과 위치 및 에러 핸들링
 *  2. 응답 데이터를 가공하는 방법과 위치
 *  3. 응답 에러 핸들링
 */
export const api = {
  search: new SearchApi(axiosBasic),
  meme: new MemeApi(axiosBasic),
  tags: new TagApi(axiosBasic),
};
