import type { HTMLAttributes, ReactNode } from "react";

import { useColoredText } from "@/application/hooks";

interface SearchItemProps extends HTMLAttributes<HTMLDivElement> {
  searchText: string;
  tagName: string;
  left?: ReactNode;
  right?: ReactNode;
}

export const SearchItem = ({ searchText, tagName, left, right, ...rest }: SearchItemProps) => {
  const { ColoredText } = useColoredText({ tagName, searchText });

  return (
    <div
      className="flex h-50 w-full cursor-pointer items-center gap-10 pl-11 pr-6 font-suit text-16-semibold-140"
      {...rest}
    >
      {left}
      {ColoredText}
      {right}
    </div>
  );
};
