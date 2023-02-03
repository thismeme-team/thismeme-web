export const APP_NAME = "당신이 찾는 ‘그 밈’";

export const TITLE = {
  getHomePageTitle: `홈 | ${APP_NAME}`,
  /**
   * 키워드 검색 결과 페이지(/explore/keywords?q=) title
   * @param keyword - 키워드
   */
  getExploreByKeywordPageTitle: (keyword?: string) => `${keyword} | ${APP_NAME}`,
  /**
   * 태그 검색 결과 페이지(/explore/tags?q=) title
   * @param tag - 태그
   */
  getExploreByTagPageTitle: (tag?: string) => `${tag} | ${APP_NAME}`,
  /**
   * 검색페이지(/search) title
   */
  getSearchPageTitle: `밈찾기 | ${APP_NAME}`,
} as const;
