export const getExploreByTagPath = (tag: string) => {
  const encodedValue = encodeURIComponent(tag);
  return `/explore/tags?q=${encodedValue}`;
};
