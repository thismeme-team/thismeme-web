import { useGetMemesByCollectionId } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/meme/InfiniteMemeList";
import { MemeLongPressContainer } from "@/components/meme/LongPress";

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
