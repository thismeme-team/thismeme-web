import { useGetMemesByCollectionId } from "@/application/hooks";
import { InfiniteMemeList, MemeLongPressContainer } from "@/components/meme";

interface Props {
  collectionId: number;
}

export const Collection = ({ collectionId }: Props) => {
  const { data: memeList, fetchNextPage } = useGetMemesByCollectionId(collectionId);

  return (
    <MemeLongPressContainer memeList={memeList}>
      <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />
    </MemeLongPressContainer>
  );
};
