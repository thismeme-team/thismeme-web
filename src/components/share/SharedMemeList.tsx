import { useGetMemesByCollectionId } from "@/application/hooks";

import { InfiniteMemeList } from "../meme/InfiniteMemeList";
import { MemeLongPressContainer } from "../meme/LongPress";

export const SharedMemeList = () => {
  const { data: memeList, fetchNextPage } = useGetMemesByCollectionId(2); //ShareId 로 props 넣어야됨

  return (
    <MemeLongPressContainer memeList={memeList}>
      <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />
    </MemeLongPressContainer>
  );
};
