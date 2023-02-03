import localFont from "@next/font/local";
import type { PropsWithChildren } from "react";
import { useRef } from "react";

import { GlobalScrollContext } from "./context";

const pretendard = localFont({
  src: "../../../styles/fonts/PretendardVariable.woff2",
  variable: "--font-pretendardVariable",
  weight: "100 900",
});

const suit = localFont({
  src: "../../../styles/fonts/SUIT-Variable.woff2",
  variable: "--font-suitVariable",
  weight: "100 900",
});

const tossface = localFont({
  src: "../../../styles/fonts/TossFaceFontMac.ttf",
  variable: "--font-tossfaceVariable",
});

export const Layout = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLElement>(null);
  return (
    <GlobalScrollContext.Provider value={ref}>
      <div
        className={`${pretendard.variable} ${suit.variable} ${tossface.variable} flex h-screen w-screen justify-center bg-gray-100 font-pretendard`}
      >
        <main
          className="relative flex w-[48rem] flex-col overflow-y-auto overflow-x-hidden bg-white px-18 shadow-lg"
          ref={ref}
        >
          {children}
        </main>
      </div>
    </GlobalScrollContext.Provider>
  );
};
