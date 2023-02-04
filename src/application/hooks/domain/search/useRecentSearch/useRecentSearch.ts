import { useLocalStorage } from "@/application/hooks/common";

import type { RecentSearch } from "./types";

const createRecentSearch = ({ value, type }: Omit<RecentSearch, "id">): RecentSearch => ({
  id: Date.now(),
  value,
  type,
});

export const useRecentSearch = () => {
  const [keywords, setKeywords] = useLocalStorage<RecentSearch[]>("recentSearch", {
    defaultValue: [],
  });

  const onClickAddKeyword = (value: string) => {
    if (!value.trim()) {
      return;
    }

    const newValue = createRecentSearch({ value, type: "keyword" });

    setKeywords((keywords) => [
      newValue,
      ...keywords.filter((keyword) => {
        const isSameValue = keyword.value === value;
        if (isSameValue) {
          return newValue.type !== keyword.type;
        }
        return !isSameValue;
      }),
    ]);
  };

  const onClickAddTag = (value: string) => {
    if (!value.trim()) {
      return;
    }

    const newValue = createRecentSearch({ value, type: "tag" });

    setKeywords((keywords) => [
      newValue,
      ...keywords.filter((keyword) => {
        const isSameValue = keyword.value === value;
        if (isSameValue) {
          return newValue.type !== keyword.type;
        }
        return !isSameValue;
      }),
    ]);
  };

  const onClickDeleteKeyword = (recentSearch: RecentSearch) => {
    const { value, type } = recentSearch;
    setKeywords((keywords) => [
      ...keywords.filter((keyword) => {
        const isSameValue = keyword.value === value;
        if (isSameValue) {
          return keyword.type === type;
        }
        return false;
      }),
    ]);
  };

  return { keywords, onClickAddKeyword, onClickAddTag, onClickDeleteKeyword };
};
