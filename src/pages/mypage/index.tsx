import Link from "next/link";
import { css } from "twin.macro";

import { useAuth } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";
import { MyPageNavigation } from "@/components/common/Navigation";
import { Photo } from "@/components/common/Photo";
import { MemeListSkeleton, Skeleton } from "@/components/common/Skeleton";
import { SSRSuspense } from "@/components/common/Suspense";
import { withAuth } from "@/components/hocs";
import { SummarizedCollection } from "@/components/mypage";

const MyPage = () => {
  const { isLoading, user } = useAuth();

  if (!user) return null;
  return (
    <>
      <MyPageNavigation />
      <div className="flex flex-col items-center justify-center py-40 font-suit">
        <Photo className="h-100 w-100 rounded-full" src={user.imageUrl} />
        <span className="mt-4 text-22-bold-140">
          {isLoading ? <Skeleton animation="wave" width={70} /> : user.name}
        </span>
        <div className="mt-24 flex divide-x divide-solid divide-gray-200">
          <Link className="pr-40 text-center" href="/share">
            <div className="text-32-bold-140">
              {isLoading ? <Skeleton animation="wave" width={47} /> : user.shareCount}
            </div>
            <div className="text-16-semibold-140">share</div>
          </Link>
          <Link className="pl-40 text-center" href="/collect">
            <div className="text-32-bold-140">
              {isLoading ? <Skeleton animation="wave" width={47} /> : user.saveCount}
            </div>
            <div className="text-16-semibold-140">collect</div>
          </Link>
        </div>
      </div>

      <div className="pb-30">
        <Link href="/collect">
          <div className="my-16 flex items-center justify-between font-suit text-22-bold-140">
            <div className="flex items-center gap-8">
              Collection
              <span className="text-16-semibold-140 text-gray-600">
                {isLoading ? <Skeleton animation="wave" width={20} /> : user.saveCount}
              </span>
            </div>
            <Icon
              name="chevronDown"
              css={css`
                transform: rotate(-90deg);
              `}
            />
          </div>
        </Link>
        <SSRSuspense fallback={<MemeListSkeleton />}>
          <SummarizedCollection collectionId={user.collectionId} />
        </SSRSuspense>
      </div>
    </>
  );
};

export default withAuth(MyPage);
