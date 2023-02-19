import { useGetUserSharedMemes } from "@/application/hooks";

import { InfiniteMemeList } from "../meme/InfiniteMemeList";
import { MemeLongPressContainer } from "../meme/LongPress";

export const MemeList = () => {
  const { data: memeList, fetchNextPage } = useGetUserSharedMemes();

  return (
    <MemeLongPressContainer memeList={memeList}>
      <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />
    </MemeLongPressContainer>
  );
};
