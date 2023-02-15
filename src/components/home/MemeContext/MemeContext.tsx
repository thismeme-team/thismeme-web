import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import { SSRSuspense } from "@/components/common/Suspense";

import { MemeSortDropDown } from "../DropDown";
import { RecentMemeList, SharedMemeList, UserFindMemeList } from "../MemeList";

type MemeListType = "user" | "share" | "recent";
export const MenuContext = createContext<MemeListType>("share");
export const MenuSetContext = createContext<Dispatch<SetStateAction<MemeListType>>>(() => null);

export const MemeContext = () => {
  const [meme, setMeme] = useState<MemeListType>("share");

  return (
    <MenuContext.Provider value={meme}>
      <MenuSetContext.Provider value={setMeme}>
        <MemeSortDropDown />
        <SSRSuspense>
          {meme === "share" ? (
            <SharedMemeList />
          ) : meme === "recent" ? (
            <RecentMemeList />
          ) : (
            <UserFindMemeList />
          )}
        </SSRSuspense>
      </MenuSetContext.Provider>
    </MenuContext.Provider>
  );
};

export const useMemeContext = () => useContext(MenuContext);
export const useSetMemeContext = () => useContext(MenuSetContext);
