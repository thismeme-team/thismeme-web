import { useGetPopularTags } from "@/application/hooks";

import { SearchPopularItem } from "./SearchPopularItem";

export const SearchPopularList = () => {
  const { tags } = useGetPopularTags();

  return (
    <ul>
      {tags?.map((tag, index) => (
        <li key={tag.tagId}>
          <SearchPopularItem index={index} name={tag.name} />
        </li>
      ))}
    </ul>
  );
};
