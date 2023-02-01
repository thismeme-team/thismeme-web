import type { LiHTMLAttributes, PropsWithChildren } from "react";
import { css } from "twin.macro";

export const ListDropDown = () => {
  return <></>;
};
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
        border: solid 1px #d7d7dd;
        background: white;
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
    <li
      className="flex h-56 items-center px-12 py-16 text-18-bold-140 hover:bg-[#EDEFFF]"
      {...rest}
    >
      {text}
    </li>
  );
};

ListDropDown.Container = ListDropDownContainer;
ListDropDown.Content = ListDropDownContent;
