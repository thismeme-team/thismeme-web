import { useLocalStorage } from "@/application/hooks/common";

import type { RecentSearch } from "./types";

const createRecentSearch = ({ value, type, id }: RecentSearch): RecentSearch => ({
  id,
  value,
  type,
});

export const useRecentSearch = () => {
  const [items, setItems] = useLocalStorage<RecentSearch[]>("recentSearch", {
    defaultValue: [],
  });

  const onAddItem = ({ value, type, id }: RecentSearch) => {
    if (!value.trim()) {
      return;
    }
    const newItem = createRecentSearch({ value, type, id });

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

  return { items: items.slice(0, 10), onAddItem, onDeleteItem };
};
