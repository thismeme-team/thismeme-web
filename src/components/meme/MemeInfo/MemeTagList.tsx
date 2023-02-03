import Link from "next/link";

import { useGetMemeTagsById } from "@/application/hooks";
import { PATH } from "@/application/util";

interface Props {
  id: string;
}
export const MemeTagList = ({ id }: Props) => {
  const { tags } = useGetMemeTagsById(id);

  return (
    <section>
      <h2 className="py-16 font-suit text-22-bold-140">Tags</h2>
      <ul className="flex flex-wrap gap-8">
        {tags?.map((tag) => (
          <li
            className="rounded-20 border border-primary-300 bg-gray-100 py-8 px-16 font-suit text-14-semibold-140 active:bg-gray-400"
            key={tag.tagId}
          >
            <Link href={PATH.getExploreByTagPath(tag.name)}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
