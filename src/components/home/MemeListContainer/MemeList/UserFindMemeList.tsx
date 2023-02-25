import { useGetUserFindMemes } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/meme";

interface Props {
  userId: number | undefined;
}

export const UserFindMemeList = ({ userId }: Props) => {
  const {
    data: memeList,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetUserFindMemes({
    userId: userId as number,
  });

  return (
    <InfiniteMemeList
      loading={isFetchingNextPage}
      memeList={memeList}
      onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
    />
  );
};
