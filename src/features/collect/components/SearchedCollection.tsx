import { useGetMemesFromCollectionByKeyword } from "@/api/search";
import { InfiniteMemeList } from "@/features/common";

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
    <InfiniteMemeList
      loading={isFetchingNextPage}
      memeList={memeList}
      onRequestAppend={() => fetchNextPage({ cancelRefetch: false })}
    />
  );
};
