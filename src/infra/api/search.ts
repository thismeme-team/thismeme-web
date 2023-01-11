import type { AxiosInstance } from "axios";

/**
 * FIX
 * API마다 Response, Request 타입 관리
 */
export class SearchApi {
  constructor(private api: AxiosInstance) {}

  getSearchResultsByKeyword = ({
    keyword,
    offset,
    limit,
  }: {
    keyword: string;
    offset: number;
    limit: number;
  }) => {
    return this.api
      .get("/search", {
        params: {
          keyword,
          offset,
          limit,
        },
      })
      .then((response) => response.data);
  };

  getSearchResultsByTag = ({
    keyword,
    offset,
    limit,
  }: {
    keyword: string;
    offset: number;
    limit: number;
  }) => {
    return this.api
      .get("/search/tag", {
        params: {
          keyword,
          offset,
          limit,
        },
      })
      .then((response) => response.data);
  };
}
