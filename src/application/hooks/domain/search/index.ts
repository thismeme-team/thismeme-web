import type { SearchKeyword } from "@/types";

import { useLocalStorage } from "../../common";

export const useRecentSearch = () => {
  const [keywords, setKeywords] = useLocalStorage<SearchKeyword[]>("recentSearch", {
    defaultValue: [],
  });

  const onClickAddKeyword = (text: string) => {
    if (!text.trim()) {
      return;
    }

    const newKeyword = {
      id: Date.now(),
      text: text,
    };

    setKeywords((keywords) => [newKeyword, ...keywords.filter((keyword) => keyword.text !== text)]); //중복된 검색어 필터링
  };

  const onClickDeleteKeyword = (text: string) => {
    setKeywords((keywords) => [...keywords.filter((keyword) => keyword.text !== text)]);
  };

  return { keywords, onClickAddKeyword, onClickDeleteKeyword };
};
