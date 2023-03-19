import Link from "next/link";

import { Drawer } from "@/components/common/Drawer";
import { Icon } from "@/components/common/Icon";
import { SSRSuspense } from "@/components/common/Suspense";

export const SideBar = () => {
  return (
    <Drawer>
      <Drawer.Trigger>
        {({ isOpen }) => (isOpen ? <Icon name="cancel" /> : <Icon name="menu" />)}
      </Drawer.Trigger>
      <Drawer.Content className="mt-70" direction="right">
        <SSRSuspense>
          <div className="rounded-24 bg-gray-100 px-16 py-24 pt-16">
            <div className="flex items-center gap-12">
              <div className="h-50 w-50 rounded-20 bg-primary-200"></div>
              <div className="h-full flex-1">로그인하기</div>
              <Icon name="setting" />
            </div>
            <div className="mt-24 flex justify-center divide-x divide-solid divide-gray-200">
              <Link className="pr-40 text-center" href="/share">
                <div className="text-32-bold-140">00</div>
                <div className="text-16-semibold-140">share</div>
              </Link>
              <Link className="pl-40 text-center" href="/collect">
                <div className="text-32-bold-140">00</div>
                <div className="text-16-semibold-140">collect</div>
              </Link>
            </div>
          </div>

          <section className="mt-86 flex flex-col gap-20">
            <div className="flex items-center justify-between text-16-semibold-140">
              <span>계정 정보</span>
              {/* TODO: 유저 정보 API 연동 */}
              <span className="text-gray-600">ojj1123@naver.com</span>
            </div>
            <div className="flex items-center justify-between text-16-semibold-140">
              <span>공지사항</span>
            </div>
            <div className="flex items-center justify-between text-16-semibold-140">
              {/* TODO: 채널톡 연동 */}
              <span>게시물 신고</span>
            </div>
            <div className="flex items-center justify-between text-16-semibold-140">
              <span>서비스 이용 문의</span>
            </div>
          </section>
        </SSRSuspense>
      </Drawer.Content>
    </Drawer>
  );
};
