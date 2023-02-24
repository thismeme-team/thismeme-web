import type { ReactNode } from "react";

import { useValidation } from "./useValidation";

interface Props {
  tagName: string;
  searchText: string;
}

export const useColoredText = ({ tagName, searchText }: Props) => {
  const index = tagName.search(searchText); //문자 있는 지 없는 확인
  const checkValidation = useValidation({
    text: searchText,
    regularValidation: /([^가-힣a-z\x20])/i, //나중에 체크할 정규식이 많아진다면 따로 파일로 분리해서 정리해도 조을듯!
  });

  const ColoredText: ReactNode = (
    <>
      {checkValidation && index !== -1 ? (
        <div className="truncate">
          <span>{tagName.slice(0, tagName.search(searchText))}</span>
          <span className="text-secondary-1000">
            {tagName.slice(index, index + searchText.length)}
          </span>
          <span>{tagName.slice(index + searchText.length)}</span>
        </div>
      ) : (
        <span>{tagName}</span>
      )}
    </>
  );

  return { ColoredText };
};
