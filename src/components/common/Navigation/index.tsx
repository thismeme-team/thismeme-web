import type { PropsWithChildren } from "react";

import Back from "/public/icon/back.svg";
import Delete from "/public/icon/cancel.svg";
import Logo from "/public/icon/logo.svg";
import SideMenu from "/public/icon/menu.svg";
import Profile from "/public/icon/mockProfile.svg";
import TopNavigation from "@/components/common/Navigation/TopNavigation";
import type { TopNavigationProps } from "@/components/common/Navigation/types";

interface Props extends TopNavigationProps {
  page: "intro" | "search" | "result";
}

// TODO svg icon 들 common/Navigation/ 폴더에 컴포넌트화 후 핸들러 함수 전달
const TOP_NAVIGATION_PROPS: Record<string, TopNavigationProps> = {
  intro: {
    left: <Logo />,
    right: (
      <>
        <Profile />
        <SideMenu />
      </>
    ),
  },
  search: {
    title: "밈 찾기",
    right: <Delete />,
  },
  result: {
    left: (
      <>
        <Back />
        <div className={"w-full"}>search...</div>
      </>
    ),
    right: (
      <>
        <Profile />
        <SideMenu />
      </>
    ),
  },
};

const Navigation = ({ children, page, left, title, right }: PropsWithChildren<Props>) => {
  const mergeProps = {
    left: left ?? TOP_NAVIGATION_PROPS[page].left,
    right: right ?? TOP_NAVIGATION_PROPS[page].right,
    title: title ?? TOP_NAVIGATION_PROPS[page].title,
  };
  return (
    <>
      <TopNavigation {...mergeProps} />
      {children}
    </>
  );
};

export default Navigation;
