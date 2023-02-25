import { useGetMemesByKeyword } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/meme";

import { EmptyMemesView } from "../EmptyMemesView";

interface Props {
  searchQuery: string;
}
export const MemesByKeyword = ({ searchQuery }: Props) => {
  const {
    data: memeList,
    isFetchingNextPage,
    isEmpty,
    fetchNextPage,
  } = useGetMemesByKeyword(searchQuery);

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
