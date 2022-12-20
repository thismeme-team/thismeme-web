import localFont from "@next/font/local";
import type { PropsWithChildren } from "react";

const myFont = localFont({
  src: "../../../styles/fonts/PretendardVariable.woff2",
  variable: "--font-pretendardVariable",
});

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`${myFont.variable} flex h-screen w-screen justify-center bg-gray-100 font-sans`}
    >
      <main className="relative flex w-full max-w-[48rem] flex-col overflow-y-auto overflow-x-hidden bg-white px-18 shadow-lg">
        {children}
      </main>
    </div>
  );
};
