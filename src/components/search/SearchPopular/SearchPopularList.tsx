import Link from "next/link";

import { useGetPopularTags } from "@/application/hooks";
import { PATH } from "@/application/util";

import { SearchPopularItem } from "./SearchPopularItem";

export const SearchPopularList = () => {
  const { tags } = useGetPopularTags();

  return (
    <ul className="flex w-screen max-w-[44rem] -translate-x-18 gap-8 overflow-x-auto py-12 px-20">
      {tags?.map((tag) => (
        <li className="shrink-0" key={tag.tagId}>
          <Link href={PATH.getExploreByTagPath(tag.tagId, tag.name)}>
            <SearchPopularItem imageSrc={tag.imageUrl} name={tag.name} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
