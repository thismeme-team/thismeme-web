import type { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-screen justify-center bg-gray-100">
      <div className="relative flex w-full max-w-[375px] flex-col bg-white px-[18px] align-middle shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Layout;
