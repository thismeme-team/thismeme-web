import { useRouter } from "next/router";

import type { RecentSearch } from "@/application/hooks";
import { isTagType } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Icon } from "@/components/common/Icon";

import { SearchItem } from "../SearchItem";

interface Props {
  items: RecentSearch[];
  onAddItem: ({ value, type, id }: RecentSearch) => void;
  onDelete: (id: RecentSearch["id"]) => void;
}

export const SearchRecent = ({ items, onAddItem, onDelete }: Props) => {
  const router = useRouter();
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col justify-between">
      {items.map((item) => {
        const { id, value, type } = item;
        return (
          <SearchItem
            key={id}
            tagName={value}
            endComponent={
              <Icon
                className="min-w-24"
                color="gray-600"
                name="delete2"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                }}
              />
            }
            startComponent={
              <Icon className="min-w-24" name={isTagType(type) ? "pound" : "search"} />
            }
            onClick={() => {
              onAddItem({ value, type, id });

              if (isTagType(type)) {
                router.push(`${PATH.getExploreByTagPath(id)}`);
                return;
              }
              router.push(`${PATH.getExploreByKeywordPath(value)}`);
            }}
            onMouseDown={(e) => {
              // Prevent input blur
              e.preventDefault();
            }}
          />
        );
      })}
    </div>
  );
};
