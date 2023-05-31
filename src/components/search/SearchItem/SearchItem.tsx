import type { HTMLAttributes, ReactNode } from "react";

import { useColoredText } from "@/application/hooks";

interface SearchItemProps extends HTMLAttributes<HTMLDivElement> {
  searchText?: string;
  tagName: string;
  startComponent?: ReactNode;
  endComponent?: ReactNode;
}

export const SearchItem = ({
  searchText = "",
  tagName,
  startComponent,
  endComponent,
  className = "",
  ...rest
}: SearchItemProps) => {
  const { ColoredText } = useColoredText({ tagName, searchText });

  return (
    <div
      className={`flex h-50 w-full cursor-pointer items-center gap-12 px-14 text-16-regular-140 ${className}`}
      {...rest}
    >
      {startComponent}
      <div className="grow truncate pr-4">{ColoredText}</div>
      {endComponent}
    </div>
  );
};
