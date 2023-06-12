import type { ReactNode } from "react";

import { useValidation } from "./useValidation";

interface Props {
  tagName: string;
  searchText: string;
}

export const useColoredText = ({ tagName, searchText }: Props) => {
  const index = tagName.search(searchText);
  const checkValidation = useValidation({
    text: searchText,
    regularValidation: /([^가-힣a-z\x20])/i,
  });

  const ColoredText: ReactNode = (
    <>
      {checkValidation && index !== -1 ? (
        <>
          <span>{tagName.slice(0, tagName.search(searchText))}</span>
          <span className="text-16-semibold-140 text-secondary-1000">
            {tagName.slice(index, index + searchText.length)}
          </span>
          <span>{tagName.slice(index + searchText.length)}</span>
        </>
      ) : (
        <span>{tagName}</span>
      )}
    </>
  );

  return { ColoredText };
};
