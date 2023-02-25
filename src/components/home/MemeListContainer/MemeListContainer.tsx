import { useState } from "react";

import { useAuth } from "@/application/hooks";
import { MemeListSkeleton } from "@/components/common/Skeleton";
import { SSRSuspense } from "@/components/common/Suspense";

import { MemeSortDropDown } from "./DropDown";
import { CommonMemeList, UserFindMemeList } from "./MemeList";
import type { MemeListType } from "./type";

export const MemeListContainer = () => {
  const { user } = useAuth();

  const [sortBy, setSortBy] = useState<MemeListType>(user ? "user" : "share");

  return (
    <>
      <MemeSortDropDown sortBy={sortBy} onClickItem={setSortBy} />
      <SSRSuspense fallback={<MemeListSkeleton />}>
        {sortBy === "user" ? (
          <UserFindMemeList userId={user?.id} />
        ) : (
          <CommonMemeList sortBy={sortBy} />
        )}
      </SSRSuspense>
    </>
  );
};
