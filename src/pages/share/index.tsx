import type { NextPage } from "next";

import { useAuth } from "@/application/hooks";
import { BackButtonNavigation } from "@/components/common/Navigation";
import { SSRSuspense } from "@/components/common/Suspense";
import { withAuth } from "@/components/hocs";
import { SharedMemeList } from "@/components/share";

const SharedHistoryPage: NextPage = () => {
  const { user } = useAuth();
  return (
    <>
      <BackButtonNavigation title="공유 히스토리" />
      <section className="pt-16" />
      <SSRSuspense>
        <SharedMemeList sharedId={user?.shareCollectionId as number} />
      </SSRSuspense>
    </>
  );
};

export default withAuth(SharedHistoryPage);
