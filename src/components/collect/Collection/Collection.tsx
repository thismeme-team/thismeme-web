import { useGetMemesByCollectionId } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/meme";

interface Props {
  collectionId: number;
}

export const Collection = ({ collectionId }: Props) => {
  const {
    data: memeList,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetMemesByCollectionId(collectionId);

  return (
    <InfiniteMemeList
      isCollection={true}
      loading={isFetchingNextPage}
      memeList={memeList}
      onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
    />
  );
};
