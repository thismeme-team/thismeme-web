import Link from "next/link";

import { usePopularTag } from "@/application/hooks";
import type { Tag } from "@/types";

import { SearchPopularItem } from "./SearchPopularItem";

export const SearchPopularList = () => {
  const { tags } = usePopularTag();

  return (
    <ul>
      {tags?.map((tag: Tag, index) => (
        <li key={tag.tagId}>
          <Link href={`explore/keywords?q=${tag.name}`}>
            <SearchPopularItem index={index} name={tag.name} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
