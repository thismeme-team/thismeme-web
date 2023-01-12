import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ className?: string }>;

export const Navigation = ({ children }: Props) => {
  return (
    <header className="sticky top-0 z-[1000] flex h-50 w-full shrink-0 items-center justify-between bg-white">
      {children}
    </header>
  );
};

const NavigationLeft = ({ children, className }: Props) => (
  <div className={`grid auto-cols-[3.2rem] grid-flow-col place-items-center ${className}`}>
    {children}
  </div>
);
const NavigationRight = ({ children, className }: Props) => (
  <div className={`grid auto-cols-[3.2rem] grid-flow-col place-items-center gap-8 ${className}`}>
    {children}
  </div>
);

const NavigationTitle = ({ children, className }: Props) => (
  <span
    className={`pointer-events-none absolute left-1/2 mx-auto block flex -translate-x-2/4 text-18-bold-140 ${className}`}
  >
    {children}
  </span>
);

Navigation.Left = NavigationLeft;
Navigation.Right = NavigationRight;
Navigation.Title = NavigationTitle;
