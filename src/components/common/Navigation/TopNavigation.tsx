import type { ReactNode } from "react";

interface Props {
  left?: ReactNode[] | ReactNode;
  title?: string;
  right?: ReactNode[] | ReactNode;
}

// TODO rem 단위로 수정 예정
function TopNavigation({ left, right, title }: Props) {
  return (
    <div className="relative flex h-12 w-full items-center justify-between gap-[16px]">
      <div className="flex grow gap-[16px] align-middle">{left}</div>
      <span className="absolute flex h-full w-full items-center justify-center text-regular">
        {title}
      </span>
      <div className="flex w-fit min-w-[32px] justify-center gap-[16px]">{right}</div>
    </div>
  );
}

export default TopNavigation;
