import type { PropsWithChildren } from "react";

import { pretendard, suit } from "@/styles/fonts";

import { ServiceGuide } from "./ServiceGuide";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ServiceGuide />
      <main
        // NOTE: 모바일 사파리 PWA 환경에서
        // 카카오 로그인 후 검색 페이지 높이가 짤리는 현상 때문에 dvh 단위로 대응
        // 모바일 사파리 브라우저 대응: 100vh -> 100dvh 단위 변경
        className={`relative min-h-[100dvh] ${pretendard.variable} ${suit.variable} mx-auto max-w-[44rem] bg-white px-18 font-suit shadow-lg`}
      >
        {children}
      </main>
    </>
  );
};
