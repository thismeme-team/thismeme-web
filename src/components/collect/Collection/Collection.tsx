import { useGetMemesByCollectionId } from "@/application/hooks";
import { MasonryInfiniteGrid } from "@/components/meme";

interface Props {
  collectionId: number;
}

export const Collection = ({ collectionId }: Props) => {
  const { data: memeList, fetchNextPage } = useGetMemesByCollectionId(collectionId);

  return <MasonryInfiniteGrid memeList={memeList} onEndReached={fetchNextPage} />;
};
