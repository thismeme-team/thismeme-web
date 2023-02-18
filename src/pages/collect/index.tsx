import { useGetMemesFromCollectionByKeyword, useInput } from "@/application/hooks";
import { CollectPageNavigation } from "@/components/common/Navigation";
import { SSRSuspense } from "@/components/common/Suspense";
import { withAuth } from "@/components/hocs";
import { Collection } from "@/components/mypage";
import { SearchInput } from "@/components/search";

const CollectPage = () => {
  const inputProps = useInput();
  const { data: memeList, fetchNextPage } = useGetMemesFromCollectionByKeyword({
    keyword: inputProps.value,
    collectionId: 1,
  });

  return (
    <>
      <CollectPageNavigation />

      <SearchInput
        {...inputProps}
        placeholder="내 콜렉션에서 '그 밈' 검색하기"
        spellCheck={false}
        type="text"
      />

      <SSRSuspense>
        {/* TODO: 검색 결과 보여주기 */}
        {/* {inputProps.value && <SearchedCollection collectionId="1" searchQuery={inputProps.value} />}
        {!inputProps.value && <Collection collectionId="1" />} */}
      </SSRSuspense>
    </>
  );
};

export default withAuth(CollectPage);
