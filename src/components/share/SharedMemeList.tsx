import { useGetMemesByCollectionId } from "@/application/hooks";

import { InfiniteMemeList } from "../meme/InfiniteMemeList";
import { MemeLongPressContainer } from "../meme/LongPress";

interface Props {
  sharedId: number;
}

export const SharedMemeList = ({ sharedId }: Props) => {
  const { data: memeList, fetchNextPage } = useGetMemesByCollectionId(sharedId);

  return (
    <MemeLongPressContainer memeList={memeList}>
      <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />
    </MemeLongPressContainer>
  );
};
