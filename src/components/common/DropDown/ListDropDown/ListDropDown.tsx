import type { LiHTMLAttributes, PropsWithChildren } from "react";
import { css, theme } from "twin.macro";

import { DropDown } from "../DropDown";

interface ContainerProps {
  width?: string;
}

const ListDropDownContainer = ({ children, width }: PropsWithChildren<ContainerProps>) => {
  return (
    <ul
      css={css`
        width: ${width}rem;
        overflow: hidden;
        border-radius: 10px;
        border: solid 1px ${theme`colors.gray.400`};
        background: white;
        transition: transform 0.4s ease, visibility 0s ease 0.4s;
      `}
    >
      {children}
    </ul>
  );
};

interface ContentProps extends LiHTMLAttributes<HTMLLIElement> {
  text: string;
}

const ListDropDownContent = ({ text, ...rest }: ContentProps) => {
  return (
    <DropDown.Content>
      <li
        className="flex h-56 items-center px-12 py-16 font-suit text-18-bold-140 hover:bg-primary-100"
        {...rest}
      >
        {text}
      </li>
    </DropDown.Content>
  );
};

export const ListDropDown = Object.assign([], {
  Container: ListDropDownContainer,
  Content: ListDropDownContent,
});
