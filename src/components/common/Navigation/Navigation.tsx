import Link from "next/link";
import type { ReactNode } from "react";

import Delete from "/public/icon/cancel.svg";
import Logo from "/public/icon/logo.svg";
import { BackButton } from "@/components/common/Navigation/BackButton";
import { Menu } from "@/components/common/Navigation/Menu";

import { Profile } from "./Profile";

interface Props {
  page: "intro" | "search" | "result";
  left?: ReactNode;
  title?: ReactNode | string;
  right?: ReactNode;
}

const NAVIGATION_PROPS: { [key in Props["page"]]: Omit<Props, "page"> } = {
  intro: {
    left: <Logo />,
    right: (
      <>
        <Profile />
        <Menu />
      </>
    ),
  },
  search: {
    title: "밈 찾기",
    right: (
      <Link className="block cursor-pointer" href="/">
        <Delete />
      </Link>
    ),
  },
  result: {
    left: <BackButton />,
    right: (
      <>
        <Profile />
        <Menu />
      </>
    ),
  },
};

export const Navigation = ({
  page,
  left = NAVIGATION_PROPS[page].left,
  right = NAVIGATION_PROPS[page].right,
  title = NAVIGATION_PROPS[page].title,
}: Props) => {
  return (
    <header className="sticky top-0 z-[1000] flex h-50 w-full items-center justify-between gap-16 bg-white">
      <div className="grid auto-cols-[3.2rem] grid-flow-col place-items-center">{left}</div>
      {title && (
        <span className="pointer-events-none absolute flex h-full w-full items-center justify-center text-18-bold-140">
          {title}
        </span>
      )}
      <div className="grid auto-cols-[3.2rem] grid-flow-col place-items-center gap-8">{right}</div>
    </header>
  );
};
