import type { PropsWithChildren } from "react";

import { pretendard, suit } from "@/styles/fonts";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main
      className={`relative min-h-screen ${pretendard.variable} ${suit.variable} mx-auto max-w-[48rem] bg-white px-18 font-pretendard shadow-lg`}
    >
      {children}
    </main>
  );
};
