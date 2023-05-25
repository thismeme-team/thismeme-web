import type { PropsWithChildren } from "react";

import { pretendard, suit } from "@/styles/fonts";

import { ServiceGuide } from "./ServiceGuide";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ServiceGuide />
      <main
        className={`relative min-h-screen ${pretendard.variable} ${suit.variable} mx-auto max-w-[48rem] bg-white px-18 font-suit shadow-lg xl:max-w-[44rem]`}
      >
        {children}
      </main>
    </>
  );
};
