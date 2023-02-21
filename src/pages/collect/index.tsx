import { useDeferredValue } from "react";

import { useDebounce, useInput } from "@/application/hooks";
import { Collection, SearchedCollection } from "@/components/collect";
import { BackButtonNavigation } from "@/components/common/Navigation";
import { SSRSuspense } from "@/components/common/Suspense";
import { withAuth } from "@/components/hocs";
import { SearchInput } from "@/components/search";

const CollectPage = () => {
  const inputProps = useInput();
  const debouncedQuery = useDebounce(inputProps.value);
  const isSearching = useDeferredValue(!!debouncedQuery);

  return (
    <>
      <BackButtonNavigation title="나의 콜렉션" />

      <SearchInput
        {...inputProps}
        placeholder="내 콜렉션에서 '그 밈' 검색하기"
        spellCheck={false}
        type="text"
      />

      <div className="mt-16">
        <SSRSuspense>
          {isSearching ? (
            <SearchedCollection collectionId={1} searchQuery={debouncedQuery} />
          ) : (
            <Collection collectionId={1} />
          )}
        </SSRSuspense>
      </div>
    </>
  );
};

export default withAuth(CollectPage);
