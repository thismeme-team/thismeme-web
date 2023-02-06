import { useLocalStorage } from "@/application/hooks/common";

import type { RecentSearch } from "./types";

const createRecentSearch = ({ value, type }: Omit<RecentSearch, "id">): RecentSearch => ({
  id: Date.now(),
  value,
  type,
});

export const useRecentSearch = () => {
  const [items, setItems] = useLocalStorage<RecentSearch[]>("recentSearch", {
    defaultValue: [],
  });

  const onAddItem = ({ value, type }: Omit<RecentSearch, "id">) => {
    if (!value.trim()) {
      return;
    }

    const newItem = createRecentSearch({ value, type });

    setItems((prevItems) => [
      newItem,
      ...prevItems.filter((item) => {
        const isDifferentValue = item.value !== newItem.value;
        if (isDifferentValue) return true;

        const isDifferentType = newItem.type !== item.type;
        if (isDifferentType) return true;

        return false;
      }),
    ]);
  };

  const onDeleteItem = (id: RecentSearch["id"]) => {
    setItems((prevItems) => [...prevItems.filter((item) => item.id !== id)]);
  };

  return { items, onAddItem, onDeleteItem };
};
