import type { GetServerSideProps, NextPage } from "next";

import { TITLE } from "@/application/util";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemesByTag } from "@/components/explore";
import { TagFavoriteButton } from "@/components/tags";

interface Props {
  searchQuery: string;
}

const ExploreByTagPage: NextPage<Props> = ({ searchQuery }) => {
  return (
    <>
      <NextSeo description={`${searchQuery} 밈 모음`} title={TITLE.exploreByKeyword(searchQuery)} />

      <ExplorePageNavigation title={searchQuery} />
      <PullToRefresh>
        <SSRSuspense>
          <MemesByTag searchQuery={searchQuery} />
        </SSRSuspense>

        <TagFavoriteButton />
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
      searchQuery: query?.q,
    },
  };
};
export default ExploreByTagPage;
