import { useGetMemesFromCollectionByKeyword } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/meme";

interface Props {
  searchQuery: string;
  collectionId: number;
}

export const SearchedCollection = ({ searchQuery, collectionId }: Props) => {
  const {
    data: memeList,
    isEmpty,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetMemesFromCollectionByKeyword({
    keyword: searchQuery,
    collectionId,
  });

  if (isEmpty) {
    return null;
  }
  return (
    <InfiniteMemeList
      isCollection={true}
      loading={isFetchingNextPage}
      memeList={memeList}
      onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
    />
  );
};
