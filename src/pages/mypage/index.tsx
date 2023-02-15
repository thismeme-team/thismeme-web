import Link from "next/link";
import { css } from "twin.macro";

import { Icon } from "@/components/common/Icon";
import { MyPageNavigation } from "@/components/common/Navigation";
import { Photo } from "@/components/common/Photo";
import { SSRSuspense } from "@/components/common/Suspense";
import { withAuth } from "@/components/hocs";
import { Collection } from "@/components/mypage";

const MyPage = () => {
  /**
   * TODO
   * 유저 정보 API 사용
   */
  return (
    <>
      <MyPageNavigation />
      <div className="flex flex-col items-center justify-center py-40 font-suit">
        <Photo className="h-100 w-100 rounded-full" />
        <span className="mt-4 text-22-bold-140">@nickname</span>
        <div className="mt-24 flex divide-x divide-solid divide-gray-200">
          <Link className="pr-40 text-center" href="/mypage">
            <div className="text-32-bold-140">97</div>
            <div className="text-16-semibold-140">share</div>
          </Link>
          <Link className="pl-40 text-center" href="/collect">
            <div className="text-32-bold-140">00</div>
            <div className="text-16-semibold-140">collect</div>
          </Link>
        </div>
      </div>

      <div className="pb-30">
        <Link href="/collect">
          <div className="my-16 flex justify-between font-suit text-22-bold-140">
            Collection
            <Icon
              name="chevronDown"
              css={css`
                transform: rotate(-90deg);
              `}
            />
          </div>
        </Link>
        <SSRSuspense>
          <Collection id="1" />
        </SSRSuspense>
      </div>
    </>
  );
};

export default withAuth(MyPage);
