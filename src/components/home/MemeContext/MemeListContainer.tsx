import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import { SSRSuspense } from "@/components/common/Suspense";

import { MemeList, UserFindMemeList } from "../MemeList";
import { MemeSortDropDown } from "./DropDown";

type MemeListType = "user" | "share" | "recent";
export const MemeListContext = createContext<MemeListType>("share");
export const MemeListSetContext = createContext<Dispatch<SetStateAction<MemeListType>>>(() => null);

export const MemeListContainer = () => {
  const [meme, setMeme] = useState<MemeListType>("share");
  console.log(meme);

  return (
    <MemeListContext.Provider value={meme}>
      <MemeListSetContext.Provider value={setMeme}>
        <MemeSortDropDown />
        <SSRSuspense>{meme === "user" ? <UserFindMemeList /> : <MemeList />}</SSRSuspense>
      </MemeListSetContext.Provider>
    </MemeListContext.Provider>
  );
};

export const useMemeListContext = () => useContext(MemeListContext);
export const useSetMemeListContext = () => useContext(MemeListSetContext);
