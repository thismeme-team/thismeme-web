import { useGetMemesByCollectionId } from "@/api/meme";
import { InfiniteMemeList } from "@/features/common";

interface Props {
  sharedId: number;
}

export const SharedMemeList = ({ sharedId }: Props) => {
  const { data: memeList, fetchNextPage } = useGetMemesByCollectionId(sharedId);

  return (
    <InfiniteMemeList
      memeList={memeList}
      onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
    />
  );
};
