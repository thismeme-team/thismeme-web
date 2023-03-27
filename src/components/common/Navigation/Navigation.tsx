import type { CSSInterpolation } from "@emotion/serialize";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string; css?: CSSInterpolation }>;

export const Navigation = ({ children, className = "" }: Props) => {
  return (
    <header
      className={`sticky top-0 z-40 flex h-54 shrink-0 items-center justify-between bg-white ${className}`}
    >
      {children}
    </header>
  );
};

const NavigationLeft = ({ children, className = "" }: Props) => (
  <div
    className={`grid auto-cols-[minmax(3.2rem,auto)] grid-flow-col place-items-center gap-8 ${className}`}
  >
    {children}
  </div>
);
const NavigationRight = ({ children, className = "" }: Props) => (
  <div
    className={`grid auto-cols-[minmax(3.2rem,auto)] grid-flow-col place-items-center gap-8 ${className}`}
  >
    {children}
  </div>
);

const NavigationCenter = ({ children, className = "" }: Props) => (
  <span className={`absolute left-1/2 -translate-x-2/4 text-18-bold-140 ${className}`}>
    {children}
  </span>
);

Navigation.Left = NavigationLeft;
Navigation.Right = NavigationRight;
Navigation.Center = NavigationCenter;
