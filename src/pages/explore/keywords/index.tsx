import type { GetServerSideProps, NextPage } from "next";

import { ExplorePageNavigation } from "@/common/components/Navigation";
import type { NextSeoProps } from "@/common/components/NextSeo";
import { NextSeo } from "@/common/components/NextSeo";
import { PullToRefresh } from "@/common/components/PullToRefresh";
import { MemeListSkeleton } from "@/common/components/Skeleton";
import { SSRSuspense } from "@/common/components/Suspense";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/common/utils";
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
