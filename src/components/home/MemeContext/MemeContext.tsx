import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

import { SSRSuspense } from "@/components/common/Suspense";

import { MemeSortDropDown } from "../DropDown";
import { MemeList } from "../MemeList";

type Meme = "user" | "share" | "recent";
export const MenuContext = createContext<Meme>("share");
export const MenuSetContext = createContext<Dispatch<SetStateAction<Meme>>>(() => null);

export const MemeContext = () => {
  const [meme, setMeme] = useState<Meme>("share");

  return (
    <MenuContext.Provider value={meme}>
      <MenuSetContext.Provider value={setMeme}>
        <MemeSortDropDown />
        <SSRSuspense>
          <MemeList />
        </SSRSuspense>
      </MenuSetContext.Provider>
    </MenuContext.Provider>
  );
};

export const useMemeContext = () => useContext(MenuContext);
export const useSetMemeContext = () => useContext(MenuSetContext);
