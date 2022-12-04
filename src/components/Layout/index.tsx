import type { PropsWithChildren } from "react";

import Back from "/public/icon/back.svg";
import Delete from "/public/icon/cancel.svg";
import Logo from "/public/icon/logo.svg";
import Menu from "/public/icon/menu.svg";
import Profile from "/public/icon/mockProfile.svg";
import TopNavigation from "@/components/common/Navigation/TopNavigation";

interface Props {
  page: "intro" | "search" | "result";
}

// TODO isMenuOpen ? <Closed /> : <Menu />
// TODO svg icon 들 common/Navigation/ 폴더에 컴포넌트화 후 핸들러 함수 전달
const TOP_NAVIGATION_PROPS = {
  intro: {
    left: <Logo />,
    right: [<Profile key="profile" />, <Menu key="menu" />],
  },
  search: {
    title: "밈 찾기",
    right: <Delete key="delete" />,
  },
  result: {
    left: [
      <Back key="back" />,
      <div key="input" className={"w-full"}>
        search...
      </div>,
    ],
    right: [<Profile key="profile" />, <Menu key="menu" />],
  },
};

const Layout = ({ children, page }: PropsWithChildren<Props>) => {
  return (
    <>
      <TopNavigation {...TOP_NAVIGATION_PROPS[page]} />
      {children}
    </>
  );
};

export default Layout;
