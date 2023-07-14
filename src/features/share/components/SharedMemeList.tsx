import { useGetMemesByCollectionId } from "@/application/hooks";
import { InfiniteMemeList } from "@/features/common";

interface Props {
  sharedId: number;
}

export const SharedMemeList = ({ sharedId }: Props) => {
  const { data: memeList, isFetchingNextPage, fetchNextPage } = useGetMemesByCollectionId(sharedId);

  return (
    <InfiniteMemeList
      loading={isFetchingNextPage}
      memeList={memeList}
      onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
    />
  );
};
