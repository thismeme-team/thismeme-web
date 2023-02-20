import { useGetUserFindMemes } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/meme/InfiniteMemeList";
import { MemeLongPressContainer } from "@/components/meme/LongPress";

export const UserFindMemeList = () => {
  const { data: memeList, fetchNextPage } = useGetUserFindMemes();
  // FIX 회원이 찾는 밈 api 형태가 getMemeBySort 와 다를 수 있을 것 같아서 컴포넌트 분리해둠

  return (
    <MemeLongPressContainer memeList={memeList}>
      <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />
    </MemeLongPressContainer>
  );
};
