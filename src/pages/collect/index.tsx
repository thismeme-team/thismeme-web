import { CollectPageNavigation } from "@/components/common/Navigation";
import { SSRSuspense } from "@/components/common/Suspense";
import { Collection } from "@/components/mypage";
import { SearchInput } from "@/components/search";

const CollectPage = () => {
  /**
   * TODO
   * 콜렉션 검색 API 사용
   */
  return (
    <>
      <CollectPageNavigation />

      <SearchInput placeholder="내 콜렉션에서 '그 밈' 검색하기" />

      <SSRSuspense>
        <Collection id="1" />
      </SSRSuspense>
    </>
  );
};

export default CollectPage;
