import type { TopNavigationProps } from "@/components/common/Navigation/types";

// TODO rem 단위로 수정 예정
function TopNavigation({ left, right, title }: TopNavigationProps) {
  return (
    <nav className="sticky top-0 flex min-h-[50px] w-full items-center justify-between gap-[16px] bg-white">
      <div className="flex grow items-center gap-[16px]">{left}</div>
      <span className="text-space absolute flex h-full w-full items-center justify-center text-regular">
        {title}
      </span>
      <div className="text flex w-fit min-w-[32px] items-center justify-center gap-[16px]">
        {right}
      </div>
    </nav>
  );
}

export default TopNavigation;
