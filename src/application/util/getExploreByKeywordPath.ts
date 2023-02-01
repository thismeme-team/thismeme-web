export const getExploreByKeywordPath = (keyword: string) => {
  const encodedValue = encodeURIComponent(keyword);
  return `/explore/keywords?q=${encodedValue}`;
};
