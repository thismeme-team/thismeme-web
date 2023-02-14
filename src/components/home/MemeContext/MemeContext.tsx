import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import { SSRSuspense } from "@/components/common/Suspense";

import { MemeSortDropDown } from "../DropDown";
import { RecentMemeList, SharedMemeList } from "../MemeList";

type Meme = "user" | "share" | "recent";
export const MenuContext = createContext<Meme>("share");
export const MenuSetContext = createContext<Dispatch<SetStateAction<Meme>>>(() => null);

export const MemeContext = () => {
  const [meme, setMeme] = useState<Meme>("share");
  console.log(meme);

  return (
    <MenuContext.Provider value={meme}>
      <MenuSetContext.Provider value={setMeme}>
        <MemeSortDropDown />
        <SSRSuspense>{meme === "share" ? <SharedMemeList /> : <RecentMemeList />}</SSRSuspense>
      </MenuSetContext.Provider>
    </MenuContext.Provider>
  );
};

export const useMemeContext = () => useContext(MenuContext);
export const useSetMemeContext = () => useContext(MenuSetContext);
