import { useDeferredValue } from "react";
import { css } from "twin.macro";

import { useInput } from "@/application/hooks";
import { SearchedCollection } from "@/components/collect/SearchedCollection";
import { CollectPageNavigation } from "@/components/common/Navigation";
import { SSRSuspense } from "@/components/common/Suspense";
import { withAuth } from "@/components/hocs";
import { Collection } from "@/components/mypage";
import { SearchInput } from "@/components/search";

const CollectPage = () => {
  const inputProps = useInput();
  // const deferredQuery = inputProps.value;
  const deferredQuery = useDeferredValue(inputProps.value);
  // const isStale = inputProps.value !== deferredQuery;
  console.log({ deferredQuery });

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
        {deferredQuery && <SearchedCollection collectionId={1} searchQuery={deferredQuery} />}
        {!deferredQuery && <Collection collectionId={1} />}
      </SSRSuspense>
    </>
  );
};

export default withAuth(CollectPage);
