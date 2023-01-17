import Link from "next/link";

import { useGetMemeTagsById } from "@/application/hooks";
import { Chip } from "@/components/common/Chip";

interface Props {
  id: string;
}
export const MemeTagList = ({ id }: Props) => {
  const { tags } = useGetMemeTagsById(id);

  return (
    <section className="mb-50">
      <span className="text-16-semibold-130">태그</span>
      <ul className="mt-16 flex flex-wrap gap-8">
        {tags?.map((tag) => (
          <Link href={`/explore/tags?q=${tag.name}`} key={tag.tagId}>
            <Chip as="li" color="lightGray" label={tag.name} size="medium" />
          </Link>
        ))}
      </ul>
    </section>
  );
};
