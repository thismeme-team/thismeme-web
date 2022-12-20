import type { ReactNode } from "react";

import Back from "/public/icon/back.svg";
import Delete from "/public/icon/cancel.svg";
import Logo from "/public/icon/logo.svg";
import SideMenu from "/public/icon/menu.svg";
import Profile from "/public/icon/mockProfile.svg";

interface Props {
  page: "intro" | "search" | "result";
  left?: ReactNode;
  title?: ReactNode | string;
  right?: ReactNode;
}

// TODO svg icon 들 common/Navigation/ 폴더에 컴포넌트화 후 핸들러 함수 전달
const NAVIGATION_PROPS: { [key in Props["page"]]: Omit<Props, "page"> } = {
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
    left: <Back />,
    title: "검색어 들어갈 곳",
    right: (
      <>
        <Profile />
        <SideMenu />
      </>
    ),
  },
};

// NOTE 디자인 시안에서 네비게이션 요소마다 gap이 조금씩 달라 바뀔 여지가 있습니다
export const Navigation = ({
  page,
  left = NAVIGATION_PROPS[page].left,
  right = NAVIGATION_PROPS[page].right,
  title = NAVIGATION_PROPS[page].title,
}: Props) => {
  return (
    <nav className="sticky top-0 flex min-h-[5rem] w-full items-center justify-between gap-16 bg-white">
      <div className="flex grow items-center gap-16">{left}</div>
      <span className="absolute flex h-full w-full items-center justify-center text-header">
        {title}
      </span>
      <div className="flex w-fit items-center justify-center gap-8">{right}</div>
    </nav>
  );
};
