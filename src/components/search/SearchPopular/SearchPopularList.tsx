import Link from "next/link";

import { useGetPopularTags } from "@/application/hooks";

import { SearchPopularItem } from "./SearchPopularItem";

export const SearchPopularList = () => {
  const { tags } = useGetPopularTags();

  return (
    <ul>
      {tags?.map((tag, index) => (
        <li key={tag.tagId}>
          <Link href={`explore/keywords?q=${tag.name}`}>
            <SearchPopularItem index={index} name={tag.name} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
