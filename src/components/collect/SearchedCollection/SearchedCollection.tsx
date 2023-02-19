import { useGetMemesFromCollectionByKeyword } from "@/application/hooks";
import { InfiniteMemeList } from "@/components/meme/InfiniteMemeList";
import { MemeLongPressContainer } from "@/components/meme/LongPress";

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
    return (
      <div className="relative w-full select-none rounded-20 bg-gray-100 font-suit before:block before:pt-[100%] before:content-['']">
        <div className="absolute inset-0 m-auto h-fit w-fit text-center">
          <div className="text-22-bold-140 text-gray-900">저장한 밈이 없나봐요</div>
          <div className="mt-8 text-12-regular-160 text-gray-600">
            언젠가 다시 쓰고 싶은 밈들을 <br />
            나의 콜렉션에서 모아보면 짱일텐데요...
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-12">
      <MemeLongPressContainer memeList={memeList}>
        <InfiniteMemeList memeList={memeList} onEndReached={fetchNextPage} />
      </MemeLongPressContainer>
    </div>
  );
};
