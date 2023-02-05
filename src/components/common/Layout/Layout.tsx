import type { PropsWithChildren } from "react";
import { useRef } from "react";

import { pretendard, suit, tossface } from "@/styles/fonts";

import { GlobalScrollContext } from "./context";

export const Layout = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLElement>(null);
  return (
    <GlobalScrollContext.Provider value={ref}>
      <div
        className={`${pretendard.variable} ${suit.variable} ${tossface.variable} flex h-screen w-screen justify-center bg-gray-100 font-pretendard`}
      >
        <main
          className="relative flex w-full max-w-[48rem] flex-col overflow-auto bg-white px-18 shadow-lg"
          ref={ref}
        >
          {children}
        </main>
      </div>
    </GlobalScrollContext.Provider>
  );
};
