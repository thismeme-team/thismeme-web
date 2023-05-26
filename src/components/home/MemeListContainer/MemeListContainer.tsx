import { useState } from "react";

import { MemeListSkeleton } from "@/components/common/Skeleton";
import { SSRSuspense } from "@/components/common/Suspense";

import { MemeSortDropDown } from "./DropDown";
import { CommonMemeList } from "./MemeList";
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
