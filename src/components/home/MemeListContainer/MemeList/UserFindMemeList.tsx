import { useGetUserFindMemes } from "@/application/hooks";
import { InfiniteMemeList, MemeLongPressContainer } from "@/components/meme";

interface Props {
  userId: number | undefined;
}

export const UserFindMemeList = ({ userId }: Props) => {
  const { data: memeList, fetchNextPage } = useGetUserFindMemes({
    userId: userId as number,
  });

  return (
    <MemeLongPressContainer memeList={memeList}>
      <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />
    </MemeLongPressContainer>
  );
};
