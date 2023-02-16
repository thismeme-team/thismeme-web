import { useState } from "react";

import { SSRSuspense } from "@/components/common/Suspense";

import { MemeSortDropDown } from "../MemeListContainer/DropDown";
import { MemeList, UserFindMemeList } from "./MemeList";
import type { MemeListType } from "./type";

export const MemeListContainer = () => {
  const [memeList, setMemeList] = useState<MemeListType>("share");

  return (
    <>
      <MemeSortDropDown setMemeList={setMemeList} />
      <SSRSuspense>
        {memeList === "user" ? <UserFindMemeList /> : <MemeList sort={memeList} />}
      </SSRSuspense>
    </>
  );
};
