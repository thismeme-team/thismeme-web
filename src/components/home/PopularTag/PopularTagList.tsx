import Link from "next/link";

import { useGetPopularTags } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Chip } from "@/components/common/Chip";

export const PopularTagList = () => {
  const { tags } = useGetPopularTags();

  return (
    <>
      {tags?.map((tag) => (
        <li key={tag.tagId}>
          <Link href={PATH.getExploreByTagPath(tag.name)}>
            <Chip className="ml-8 mb-8" color="darkGray" label={tag.name} size="medium" />
          </Link>
        </li>
      ))}
    </>
  );
};
