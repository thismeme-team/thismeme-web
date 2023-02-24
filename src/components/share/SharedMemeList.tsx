import { useGetMemesByCollectionId } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/meme";

interface Props {
  sharedId: number;
}

export const SharedMemeList = ({ sharedId }: Props) => {
  const { data: memeList, fetchNextPage } = useGetMemesByCollectionId(sharedId);

  return <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />;
};
