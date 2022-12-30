import type { HTMLAttributes } from "react";

type MemeListProps = HTMLAttributes<HTMLUListElement>;
export const MemeList = ({ children }: MemeListProps) => {
  return <ul className="my-16 columns-3xs gap-x-16">{children}</ul>;
};
