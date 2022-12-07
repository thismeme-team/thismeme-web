import type { TopNavigationProps } from "@/components/common/Navigation/types";

function TopNavigation({ left, right, title }: TopNavigationProps) {
  return (
    <nav className="min-h-50 sticky top-0 flex w-full items-center justify-between gap-16 bg-white">
      <div className="flex grow items-center gap-16">{left}</div>
      <span className="text-space absolute flex h-full w-full items-center justify-center text-regular">
        {title}
      </span>
      <div className="text min-w-32 flex w-fit items-center justify-center gap-16">{right}</div>
    </nav>
  );
}

export default TopNavigation;
