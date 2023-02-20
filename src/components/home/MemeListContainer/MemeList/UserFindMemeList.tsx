import { useGetUserFindMemes } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/meme/InfiniteMemeList";
import { MemeLongPressContainer } from "@/components/meme/LongPress";

interface Props {
  userId: number | undefined;
}

export const UserFindMemeList = ({ userId }: Props) => {
  const { data: memeList, fetchNextPage } = useGetUserFindMemes({
    userId: userId as number,
  });

  return (
    <MemeLongPressContainer memeList={memeList}>
      <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />;
    </MemeLongPressContainer>
  );
};
