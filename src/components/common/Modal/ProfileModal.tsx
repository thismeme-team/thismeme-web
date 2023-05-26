import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth, useToast } from "@/application/hooks";
import { PATH } from "@/application/util";

import { DropDown } from "../DropDown";
import { Icon } from "../Icon";
import { Photo } from "../Photo";

export const ProfileModal = () => {
  const { user, logout } = useAuth();
  const { show } = useToast();
  const { push } = useRouter();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => push(PATH.getMainPage),
      onError: () => show("오류가 발생하였습니다"),
    });
  };

  return (
    <>
      <DropDown>
        <DropDown.Trigger>
          <div css={{ fontSize: 0 }}>
            <Photo className="h-32 w-32 rounded-10" src={user?.imageUrl} />
          </div>
        </DropDown.Trigger>
        <DropDown.Contents css={{ top: "7rem", right: "1.6rem", width: "34rem" }}>
          <DropDown.Content>
            <Link
              className="flex h-92 items-center justify-between p-16 font-suit text-22-bold-140"
              href="/mypage"
            >
              <section className="mr-16 flex items-center">
                <Photo className="mr-16 h-60 w-60 rounded-full" src={user?.imageUrl} />
                {user?.name}
              </section>
              <Icon name="setting" />
            </Link>
          </DropDown.Content>
          <DropDown.Content className="flex h-80 items-center justify-center font-suit">
            <section className="flex flex-col border-r-2 border-gray-200 pr-40 text-center">
              <span className="text-32-bold-140">{user?.shareCount}</span>
              <span className="text-16-semibold-140">share</span>
            </section>
            <section className="flex flex-col pl-40 text-center">
              <span className="text-32-bold-140">{user?.saveCount}</span>
              <span className="text-16-semibold-140">collect</span>
            </section>
          </DropDown.Content>
          <DropDown.Content
            className="mt-24 flex h-60 cursor-pointer items-center justify-center bg-black font-suit text-18-bold-140 text-white"
            onClick={handleLogout}
          >
            로그아웃
          </DropDown.Content>
        </DropDown.Contents>
      </DropDown>
    </>
  );
};
