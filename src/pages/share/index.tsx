import type { NextPage } from "next";

import { useAuth } from "@/application/hooks";
import { BackButtonNavigation } from "@/common/components/Navigation";
import { MemeListSkeleton } from "@/common/components/Skeleton";
import { SSRSuspense } from "@/common/components/Suspense";
import { withAuth } from "@/components/hocs";
import { SharedMemeList } from "@/features/share/components";

const SharedHistoryPage: NextPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <BackButtonNavigation title="공유 히스토리" />
      <section className="pt-16" />
      <SSRSuspense fallback={<MemeListSkeleton />}>
        <SharedMemeList sharedId={user.sharedCollectionId} />
      </SSRSuspense>
    </>
  );
};

export default withAuth(SharedHistoryPage);
