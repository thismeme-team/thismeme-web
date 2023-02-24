import { useGetMemesByCollectionId } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/meme";

interface Props {
  collectionId: number;
}

export const Collection = ({ collectionId }: Props) => {
  const { data: memeList, fetchNextPage } = useGetMemesByCollectionId(collectionId);

  return <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />;
};
