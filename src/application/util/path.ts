export const PATH = {
  /**
   * 키워드 검색 결과 페이지
   * @param keyword - 키워드
   * @return /explore/keywords?q={encoded keyword}
   */
  getExploreByKeywordPath: (keyword: string) => {
    const encodedValue = encodeURIComponent(keyword);
    return `/explore/keywords?q=${encodedValue}`;
  },
  /**
   * 태그 검색 결과 페이지
   * @param tag - 태그
   * @return /explore/tags?q={encoded 태그}
   */
  getExploreByTagPath: (tag: string) => {
    const encodedValue = encodeURIComponent(tag);
    return `/explore/tags?q=${encodedValue}`;
  },

  getMainPage: "/",
};
