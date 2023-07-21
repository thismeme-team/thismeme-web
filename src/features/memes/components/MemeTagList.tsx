import Link from "next/link";

import { useGetMemeTagsById } from "@/api/tag";
import { PATH } from "@/common/utils";

interface Props {
  id: string;
}
export const MemeTagList = ({ id }: Props) => {
  const { tags } = useGetMemeTagsById(id);

  if (!tags.length) return null;

  return (
    <section>
      <h2 className="py-16 font-suit text-22-bold-140">Tags</h2>
      <ul className="flex flex-wrap gap-8">
        {tags.map((tag) => (
          <li
            className="flex h-36 rounded-20 border border-primary-300 bg-gray-100 text-14-semibold-140 active:bg-gray-400"
            key={tag.tagId}
          >
            <Link
              className="ga-meme-tag-click px-16 leading-[3.4rem]"
              href={PATH.getExploreByTagPath(tag.tagId, tag.name)}
            >
              {tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
