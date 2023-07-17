import { useDeferredValue } from "react";

import { BackButtonNavigation } from "@/common/components/Navigation";
import { MemeListSkeleton } from "@/common/components/Skeleton";
import { SSRSuspense } from "@/common/components/Suspense";
import { useDebounce, useInput } from "@/common/hooks";
import { Collection, SearchedCollection } from "@/features/collect/components";
import { useAuth, withAuth } from "@/features/common";
import { SearchInput } from "@/features/search/components";

const CollectPage = () => {
  const inputProps = useInput();
  const debouncedQuery = useDebounce(inputProps.value);
  const isSearching = useDeferredValue(!!debouncedQuery);
  const { user } = useAuth();

  if (!user) return null;

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
        <SSRSuspense fallback={<MemeListSkeleton />}>
          {isSearching ? (
            <SearchedCollection collectionId={user.collectionId} searchQuery={debouncedQuery} />
          ) : (
            <Collection collectionId={user.collectionId} />
          )}
        </SSRSuspense>
      </div>
    </>
  );
};

export default withAuth(CollectPage);
