import { useGetMemesByCollectionId } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeActionSheetContainer } from "@/components/meme";
import { MemeItem } from "@/components/meme/MemeItem";

interface Props {
  collectionId: number;
}

export const SummarizedCollection = ({ collectionId }: Props) => {
  const { data: memeList, isEmpty } = useGetMemesByCollectionId(collectionId);

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
    <Masonry columns={2} spacing={9}>
      {memeList.map((meme) => (
        <MemeActionSheetContainer isCollection={true} key={meme.memeId} meme={meme}>
          <MemeItem key={meme.memeId} meme={meme} />
        </MemeActionSheetContainer>
      ))}
    </Masonry>
  );
};
