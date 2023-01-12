import { useGetPopularTags } from "@/application/hooks";

import { Chip } from "../common/Chip";

export const HomePopular = () => {
  const { tags } = useGetPopularTags();

  return (
    <>
      {tags?.map((tag) => (
        <li key={tag.tagId}>
          <Chip className="ml-8 mb-8" color="darkGray" label={tag.name} size="medium" />
        </li>
      ))}
    </>
  );
};
