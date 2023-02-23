import { useGetMemesFromCollectionByKeyword } from "@/application/hooks";
import { InfiniteMemeList, MemeLongPressContainer } from "@/components/meme";

interface Props {
  searchQuery: string;
  collectionId: number;
}

export const SearchedCollection = ({ searchQuery, collectionId }: Props) => {
  const {
    data: memeList,
    isEmpty,
    fetchNextPage,
  } = useGetMemesFromCollectionByKeyword({
    keyword: searchQuery,
    collectionId,
  });

  if (isEmpty) {
    return null;
  }
  return (
    <MemeLongPressContainer memeList={memeList}>
      <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />
    </MemeLongPressContainer>
  );
};
