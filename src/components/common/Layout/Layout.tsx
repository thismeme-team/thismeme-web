import type { PropsWithChildren } from "react";
import { css } from "twin.macro";

import { pretendard, suit } from "@/styles/fonts";

import { ServiceGuide } from "./ServiceGuide";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ServiceGuide />
      <main
        className={`relative min-h-screen ${pretendard.variable} ${suit.variable} mx-auto max-w-[48rem] bg-white px-18 font-suit shadow-lg xl:ml-auto xl:mr-[5%] xl:max-w-[37.5rem]`}
        css={css`
          @media screen and (min-width: 1680px) {
            margin-right: 15%;
          }
          @media screen and (min-width: 1920px) {
            margin-right: 25%;
          }
        `}
      >
        {children}
      </main>
    </>
  );
};
