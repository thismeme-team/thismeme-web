import type { NextPage } from "next";

import { BackButtonNavigation } from "@/components/common/Navigation";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemeList } from "@/components/share";

const SharedHistoryPage: NextPage = () => {
  return (
    <>
      <BackButtonNavigation title="공유 히스토리" />
      <section className="pt-16" />
      <SSRSuspense>
        <MemeList />
      </SSRSuspense>
    </>
  );
};

export default SharedHistoryPage;
