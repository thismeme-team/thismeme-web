import { useGetMemesByTag } from "@/application/hooks";
import { EmptyMemesView, InfiniteMemeList } from "@/features/common";

interface Props {
  searchQuery: string;
}
export const MemesByTag = ({ searchQuery }: Props) => {
  const {
    data: memeList,
    isEmpty,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetMemesByTag(searchQuery);

  if (isEmpty) {
    return <EmptyMemesView />;
  }

  return (
    <InfiniteMemeList
      loading={isFetchingNextPage}
      memeList={memeList}
      onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
    />
  );
};
