import { useState } from "react";

import { useAuth } from "@/application/hooks";
import { SSRSuspense } from "@/components/common/Suspense";

import { MemeSortDropDown } from "./DropDown";
import { CommonMemeList, UserFindMemeList } from "./MemeList";
import type { MemeListType } from "./type";

export const MemeListContainer = () => {
  const { isLogin, isLoading, user } = useAuth();
  const [sortBy, setSortBy] = useState<MemeListType>(isLogin ? "user" : "share");

  if (isLoading) return null;
  return (
    <>
      <MemeSortDropDown sortBy={sortBy} onClickItem={setSortBy} />
      <SSRSuspense>
        {sortBy === "user" ? (
          <UserFindMemeList userId={user?.id} />
        ) : (
          <CommonMemeList sortBy={sortBy} />
        )}
      </SSRSuspense>
    </>
  );
};
