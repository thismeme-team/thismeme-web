export const APP_NAME = "당신이 찾는 ‘그 밈’";

export const DEFAULT_DESCRIPTION = "네가 찾던 ‘그 밈’ 그 집이 내 집이였어야 해";

export const TITLE = {
  /**
   * 메인 페이지(/)
   */
  home: `홈 | ${APP_NAME}`,
  /**
   * 키워드 검색 결과 페이지(/explore/keywords?q=)
   * @param keyword - 키워드
   */
  exploreByKeyword: (keyword?: string) => `${keyword} | ${APP_NAME}`,
  /**
   * 태그 검색 결과 페이지(/explore/tags?q=)
   * @param tag - 태그
   */
  exploreByTag: (tag?: string) => `${tag} | ${APP_NAME}`,
  /**
   * 검색페이지(/search)
   */
  search: `밈찾기 | ${APP_NAME}`,
  memeDetail: (title: string) => `${title} | ${APP_NAME}`,
} as const;
