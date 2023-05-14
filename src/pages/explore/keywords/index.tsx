import type { GetServerSideProps, NextPage } from "next";

import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/application/util";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import type { NextSeoProps } from "@/components/common/NextSeo";
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
      <NextSeo title={`'${searchQuery}' 밈`} {...metadata} />

      <ExplorePageNavigation title={searchQuery} />
      <PullToRefresh>
        <SSRSuspense fallback={<MemeListSkeleton />}>
          <MemesByKeyword searchQuery={searchQuery} />
        </SSRSuspense>
      </PullToRefresh>
    </>
  );
};

const metadata: NextSeoProps = {
  description: DEFAULT_DESCRIPTION,

  openGraph: {
    siteName: SITE_NAME,
    imageUrl: "/open-graph/home.png",
  },
  twitter: {
    cardType: "summary_large_image",
  },
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
