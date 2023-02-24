import { useGetUserFindMemes } from "@/application/hooks";
import { MasonryInfiniteGrid } from "@/components/meme";

interface Props {
  userId: number | undefined;
}

export const UserFindMemeList = ({ userId }: Props) => {
  const { data: memeList, fetchNextPage } = useGetUserFindMemes({
    userId: userId as number,
  });

  return <MasonryInfiniteGrid memeList={memeList} onEndReached={fetchNextPage} />;
};
