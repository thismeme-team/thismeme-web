import Link from "next/link";

import { useAuth, useModal } from "@/application/hooks";
import { channelUrl, instagramUrl, twitterUrl } from "@/application/util";
import { Drawer } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";

import { SignOutModal } from "../../Modal";
import { Photo } from "../../Photo";

export const SideBar = () => {
  const { user, validate, isLogin } = useAuth();
  const modalProps = useModal();

  return (
    <>
      <Drawer>
        <Drawer.Trigger>
          {({ isOpen }) => (isOpen ? <Icon name="cancel" /> : <Icon name="menu" />)}
        </Drawer.Trigger>
        <Drawer.Content direction="right">
          <div className="flex h-full flex-col pt-9 pb-30">
            <button
              className="w-full rounded-24 bg-gray-100 px-16 pt-16 pb-24"
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onClick={validate(() => {})}
            >
              {isLogin && (
                <>
                  <Link className="flex items-center gap-12" href="/mypage">
                    <Photo className="h-50 w-50 rounded-20" src={user?.imageUrl} />
                    <span className="grow text-left text-18-bold-140 text-gray-900">
                      {user?.name}
                    </span>
                    <Icon name="setting" />
                  </Link>

                  <div className="mt-24 flex justify-center divide-x divide-solid divide-gray-200">
                    <Link className="pr-40 text-center" href="/share">
                      <span className="block text-32-bold-140">{user?.shareCount}</span>
                      <span className="block text-16-semibold-140">share</span>
                    </Link>
                    <Link className="pl-40 text-center" href="/collect">
                      <span className="block text-32-bold-140">{user?.sharedCollectionId}</span>
                      <span className="block text-16-semibold-140">collect</span>
                    </Link>
                  </div>
                </>
              )}

              {!isLogin && (
                <>
                  <div className="flex items-center gap-12">
                    <Photo className="h-50 w-50 rounded-20" src="/img/default-avatar.png" />
                    <span className="grow text-left text-18-bold-140 text-gray-900">
                      로그인하기
                    </span>
                    <Icon name="setting" />
                  </div>
                  <div className="mt-24 flex justify-center divide-x divide-solid divide-gray-200">
                    <div className="pr-40 text-center">
                      <span className="block text-32-bold-140">0</span>
                      <span className="block text-16-semibold-140">share</span>
                    </div>
                    <div className="pl-40 text-center">
                      <span className="block text-32-bold-140">0</span>
                      <span className="block text-16-semibold-140">collect</span>
                    </div>
                  </div>
                </>
              )}
            </button>

            <section className="mt-40 flex grow flex-col gap-20">
              {isLogin && (
                <div className="flex items-center justify-between text-16-semibold-140">
                  <span>계정 정보</span>
                  <span className="text-gray-600">{user?.email}</span>
                </div>
              )}

              <a
                className="flex items-center justify-between text-16-semibold-140"
                href={channelUrl}
                rel="noreferrer"
                target="_blank"
              >
                게시물 신고
              </a>

              <a
                className="flex items-center justify-between text-16-semibold-140"
                href={channelUrl}
                rel="noreferrer"
                target="_blank"
              >
                서비스 이용 문의
              </a>

              {isLogin && (
                <button
                  className="flex items-center justify-between text-16-semibold-140"
                  onClick={modalProps.onOpen}
                >
                  로그아웃
                </button>
              )}
            </section>

            {/* <div className="absolute bottom-30 left-1/2 -translate-x-1/2"> */}
            <div className="relative">
              <div className="mb-8 flex justify-center gap-8">
                <a href={twitterUrl} rel="noreferrer" target="_blank">
                  <Icon name="twitter" />
                </a>
                <a href={instagramUrl} rel="noreferrer" target="_blank">
                  <Icon name="instagram" />
                </a>
              </div>
              <div className="text-center text-12-bold-160 text-gray-600">&copy; thismeme.me</div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer>
      <SignOutModal {...modalProps} />
    </>
  );
};
