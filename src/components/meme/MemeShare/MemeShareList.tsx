import type { PropsWithChildren } from "react";

interface Props {
  className: string;
}
export const MemeShareList = ({ className = "", children }: PropsWithChildren<Props>) => {
  return (
    <div className={`flex flex-col items-center gap-16 ${className}`}>
      <ul className="flex gap-10">{children}</ul>
      <span className="text-16-semibold-130 text-dark-gray-20">친구에게 밈을 공유해 보세요</span>
    </div>
  );
};
