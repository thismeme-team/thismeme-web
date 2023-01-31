import type { LiHTMLAttributes, PropsWithChildren } from "react";

export const ListDropDown = () => {
  return <></>;
};
interface ContainerProps {
  width?: string;
}
interface ContentProps extends LiHTMLAttributes<HTMLLIElement> {
  text: string;
}
const ListDropDownContainer = ({ children, width }: PropsWithChildren<ContainerProps>) => {
  return (
    <ul className={`w-[${width}rem] rounded-10 border-[1px] border-[#D7D7DD] bg-white`}>
      {children}
    </ul>
  );
};

const ListDropDownContent = ({ text, ...rest }: ContentProps) => {
  return (
    <>
      <li
        className="flex h-56 items-center px-12 py-16 text-18-bold-140 hover:bg-[#EDEFFF]"
        {...rest}
      >
        {text}
      </li>
    </>
  );
};

ListDropDown.Container = ListDropDownContainer;
ListDropDown.Content = ListDropDownContent;
