export const APP_NAME = "그 밈";

export const DEFAULT_DESCRIPTION = "당신이 찾는 ‘그 밈’ 여기 있다.";
export const EMPTY_SEARCH_DESCRIPTION = "당신이 찾는 ‘그 밈’ 여기 없다...";

export const TITLE = {
  /**
   * 메인 페이지(/)
   */
  default: `${APP_NAME} : 무한도전 밈 검색`,
  /**
   * 검색페이지(/search)
   */
  search: `${APP_NAME} : 무한도전 밈 검색`,
  /**
   * 키워드 검색 결과 페이지(/explore/keywords?q=)
   * @param keyword - 키워드
   */
  exploreByKeyword: (keyword?: string) => `'${keyword}' 밈`,
  /**
   * 태그 검색 결과 페이지(/explore/tags/${tagId})
   * @param tag - 태그
   */
  exploreByTag: (tag?: string) => `'${tag}' 밈`,
  /**
   * 검색결과 없을 때 페이지
   * @param search
   */
  emptySearch: (search?: string) => `'${search}' 밈`,
  /**
   * 밈 상세 페이지(/memes/${id})
   */
  memeDetail: (title: string) => `${APP_NAME} : ${title}`,
} as const;
