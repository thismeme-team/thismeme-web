import type { GetServerSideProps, NextPage } from "next";

import { TITLE } from "@/application/util";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { MemeListSkeleton } from "@/components/common/Skeleton";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemesByKeyword } from "@/components/explore";

interface Props {
  searchQuery: string;
}

const ExploreByKeywordPage: NextPage<Props> = ({ searchQuery }) => {
  return (
    <>
      <NextSeo description={`${searchQuery} 밈 모음`} title={TITLE.exploreByKeyword(searchQuery)} />

      <ExplorePageNavigation title={searchQuery} />
      <PullToRefresh>
        <div className="mt-12">
          <SSRSuspense fallback={<MemeListSkeleton />}>
            <MemesByKeyword searchQuery={searchQuery} />
          </SSRSuspense>
        </div>
      </PullToRefresh>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  /**
   * @description
   * query.q 타입 검사
   * 문자열이 아니면 404 로 이동
   */
  if (!query.q || typeof query.q !== "string") {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      searchQuery: query.q,
    },
  };
};
export default ExploreByKeywordPage;
