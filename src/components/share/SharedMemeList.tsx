import { useGetMemesByCollectionId } from "@/application/hooks";
import { MasonryInfiniteGrid } from "@/components/meme";

interface Props {
  sharedId: number;
}

export const SharedMemeList = ({ sharedId }: Props) => {
  const { data: memeList, fetchNextPage } = useGetMemesByCollectionId(sharedId);

  return <MasonryInfiniteGrid memeList={memeList} onEndReached={fetchNextPage} />;
};
