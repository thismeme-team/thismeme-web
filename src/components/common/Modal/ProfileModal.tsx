import Link from "next/link";

import { useAuth } from "@/application/hooks";

import { DropDown } from "../DropDown";
import { Icon } from "../Icon";

export const ProfileModal = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <DropDown>
        <DropDown.Trigger>
          <Icon name="loginprofile" />
        </DropDown.Trigger>
        <DropDown.Contents css={{ right: 0, width: "34rem" }}>
          <DropDown.Content>
            <Link
              className="flex h-92 items-center justify-between p-16 font-suit text-22-bold-140"
              href="/mypage"
            >
              <Icon height={60} name="loginprofile" width={60} />@{user?.name}
              <Icon name="setting" />
            </Link>
          </DropDown.Content>
          <DropDown.Content className="flex h-80 items-center justify-center font-suit">
            <section className="flex flex-col border-r-2 border-gray-200 pr-40">
              <span className="text-32-bold-140">97</span>
              <span className="text-16-semibold-140">share</span>
            </section>
            <section className="flex flex-col pl-40">
              <span className="text-32-bold-140">43</span>
              <span className="text-16-semibold-140">collect</span>
            </section>
          </DropDown.Content>
          <DropDown.Content
            className="mt-24 flex h-60 items-center justify-center bg-black font-suit text-18-bold-140 text-white"
            onClick={() => logout()}
          >
            로그아웃
          </DropDown.Content>
        </DropDown.Contents>
      </DropDown>
    </>
  );
};
