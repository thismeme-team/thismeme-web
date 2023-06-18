import Link from "next/link";

import type { RecentSearch } from "@/application/hooks";
import { useGetPopularTags } from "@/application/hooks";
import { PATH } from "@/common/utils";

import { SearchPopularItem } from "./SearchPopularItem";

interface Props {
  onAddItem: ({ value, type, id }: RecentSearch) => void;
}
export const SearchPopularList = ({ onAddItem }: Props) => {
  const { tags } = useGetPopularTags();

  return (
    <ul className="flex w-screen max-w-[44rem] -translate-x-18 gap-8 overflow-x-auto py-12 px-20">
      {tags?.map((tag) => (
        <li className="shrink-0" key={tag.tagId}>
          <Link href={PATH.getExploreByTagPath(tag.tagId, tag.name)}>
            <SearchPopularItem
              imageSrc={tag.imageUrl}
              name={tag.name}
              onClick={() => {
                onAddItem({ value: tag.name, type: "tag", id: tag.tagId });
              }}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
