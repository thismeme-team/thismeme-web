import Link from "next/link";
import { css } from "twin.macro";

import { useGetPopularTags } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Chip } from "@/components/common/Chip";

export const PopularTagList = () => {
  const { tags } = useGetPopularTags();

  return (
    <div
      className="w-screen"
      css={css`
        overflow: unset;
      `}
    >
      <ul className="flex overflow-x-scroll pt-8 pb-40">
        {tags?.map((tag) => (
          <li key={tag.tagId}>
            <Link href={PATH.getExploreByTagPath(tag.name)}>
              <Chip className="ml-8 mb-8" color="black" label={tag.name} size="medium" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
