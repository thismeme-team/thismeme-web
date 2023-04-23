import { useGetMemesByCollectionId } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
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
  /**
   * TODO
   * 기존 기획에서 마이, 콜렉션페이지에서는 액션시트에 '콜렉션에 저장하기' 버튼이 없었기 때문에
   * MemeItem에서 ActionSheet를 overlay.open 한다면 마이, 콜렉션페이지인지 아닌지 판단하는 로직 필요
   *
   * AS-IS
   * InfiniteMemeList -> MemeActionSheetContainer -> ActionSheet로 isCollection props를 내려주고 있었음
   * -> 지금은 ActionSheet를 MemeItem에서 overlay.open하므로 이 방법을 사용할 수 없음
   * TO-BE
   * 마이페이지인지 아닌지 판단하는 hook을 만들고 MemeActionSheet 에서 호출
   */
  return (
    <Masonry columns={2} spacing={9}>
      {memeList.map((meme) => (
        <MemeItem key={meme.memeId} meme={meme} />
      ))}
    </Masonry>
  );
};
