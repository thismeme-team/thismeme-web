import Link from "next/link";

import { useGetPopularTags } from "@/application/hooks";
import { Chip } from "@/components/common/Chip";

export const PopularTagList = () => {
  const { tags } = useGetPopularTags();

  return (
    <>
      {tags?.map((tag) => (
        <li key={tag.tagId}>
          <Link href={`explore/tags?q=${tag.name}`}>
            <Chip className="ml-8 mb-8" color="black" label={tag.name} size="medium" />
          </Link>
        </li>
      ))}
    </>
  );
};
