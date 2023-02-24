import { useGetMemesFromCollectionByKeyword } from "@/application/hooks";
import { MasonryInfiniteGrid } from "@/components/meme";

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
  return <MasonryInfiniteGrid memeList={memeList} onEndReached={fetchNextPage} />;
};
