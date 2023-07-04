import { useGetMemesByTag } from "@/application/hooks";
import { InfiniteMemeList } from "@/features/common";

import { EmptyMemesView } from "../EmptyMemesView";

interface Props {
  searchQuery: string;
}
export const MemesByTag = ({ searchQuery }: Props) => {
  const {
    data: memeList,
    isEmpty,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetMemesByTag(searchQuery);

  if (isEmpty) {
    return <EmptyMemesView />;
  }

  return (
    <InfiniteMemeList
      loading={isFetchingNextPage}
      memeList={memeList}
      onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
    />
  );
};
