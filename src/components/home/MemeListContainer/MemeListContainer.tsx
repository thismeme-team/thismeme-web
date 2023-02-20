import { useState } from "react";

import { useAuth } from "@/application/hooks";
import { SSRSuspense } from "@/components/common/Suspense";

import { MemeSortDropDown } from "./DropDown";
import { CommonMemeList, UserFindMemeList } from "./MemeList";
import type { MemeListType } from "./type";

export const MemeListContainer = () => {
  const { isLogin, isLoading } = useAuth();
  const [sortBy, setSortBy] = useState<MemeListType>(isLogin ? "user" : "share");

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <>
          <MemeSortDropDown sortBy={sortBy} onClickItem={setSortBy} />
          <SSRSuspense>
            {sortBy === "user" ? <UserFindMemeList /> : <CommonMemeList sortBy={sortBy} />}
          </SSRSuspense>
        </>
      )}
    </>
  );
};
