import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLUListElement>;
export const MemeList = ({ children }: Props) => {
  return <ul className="my-16 columns-3xs gap-x-16">{children}</ul>;
};
