import Link from "next/link";

import { useGetMemeTagsById } from "@/application/hooks";
import { PATH } from "@/application/util";
import { Chip } from "@/components/common/Chip";

interface Props {
  id: string;
}

export const SharedMemeTagList = ({ id }: Props) => {
  const { tags } = useGetMemeTagsById(id);

  if (!tags.length) return null;

  return (
    <ul className="flex gap-8 overflow-x-scroll">
      {tags?.map((tag) => (
        <li className="shrink-0" key={tag.tagId}>
          <Link href={`${PATH.getExploreByTagPath(tag.name)}`}>
            <Chip as="button" color="white" label={tag.name} size="medium" />
          </Link>
        </li>
      ))}
    </ul>
  );
};
