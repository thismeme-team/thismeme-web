import type { NextPage } from "next";

import { BackButtonNavigation } from "@/components/common/Navigation";
import { SSRSuspense } from "@/components/common/Suspense";
import { SharedMemeList } from "@/components/share";

const SharedHistoryPage: NextPage = () => {
  return (
    <>
      <BackButtonNavigation title="공유 히스토리" />
      <section className="pt-16" />
      <SSRSuspense>
        <SharedMemeList />
      </SSRSuspense>
    </>
  );
};

export default SharedHistoryPage;
