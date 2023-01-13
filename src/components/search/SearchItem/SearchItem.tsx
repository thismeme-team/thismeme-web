import type { HTMLAttributes, ReactNode } from "react";

import { useColoredText } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";

interface SearchItemProps extends HTMLAttributes<HTMLDivElement> {
  searchText: string;
  tagName: string;
  right?: ReactNode;
}

export const SearchItem = ({ searchText, tagName, right, ...rest }: SearchItemProps) => {
  const { ColoredText } = useColoredText({ tagName, searchText });

  return (
    <div
      className="relative flex h-50 w-full items-center pl-11 pr-6 text-16-semibold-130"
      {...rest}
    >
      <Icon className="mr-10" name="search" />
      {ColoredText}
      {right}
    </div>
  );
};
