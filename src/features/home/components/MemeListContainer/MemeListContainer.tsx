import { useState } from "react";

import { MemeListSkeleton } from "@/common/components/Skeleton";
import { SSRSuspense } from "@/common/components/Suspense";

import { CommonMemeList } from "./CommonMemeList";
import { MemeSortDropDown } from "./MemeSortDropDown";
import type { MemeListType } from "./type";

export const MemeListContainer = () => {
  const [sortBy, setSortBy] = useState<MemeListType>("share");

  return (
    <>
      <MemeSortDropDown sortBy={sortBy} onClickItem={setSortBy} />
      <SSRSuspense fallback={<MemeListSkeleton />}>
        <CommonMemeList sortBy={sortBy} />
      </SSRSuspense>
    </>
  );
};
