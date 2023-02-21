import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";

import { fetchTagInfo } from "@/application/hooks";
import { TITLE } from "@/application/util";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemesByTag } from "@/components/explore";
import { TagBookmarkButton } from "@/components/tags";

interface Props {
  searchQuery: string;
  tagId: number;
}

const ExploreByTagPage: NextPage<Props> = ({ searchQuery, tagId }) => {
  return (
    <>
      <NextSeo description={`${searchQuery} 밈 모음`} title={TITLE.exploreByKeyword(searchQuery)} />

      <ExplorePageNavigation title={`#${searchQuery}`} />

      <PullToRefresh>
        <SSRSuspense>
          <MemesByTag searchQuery={searchQuery} />
        </SSRSuspense>

        <TagBookmarkButton tagId={tagId} />
      </PullToRefresh>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const tagId = params?.tagId;
  const queryClient = new QueryClient();

  if (typeof tagId !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    const { name: tagName } = await fetchTagInfo(Number(tagId), queryClient);

    return {
      props: {
        hydrateState: dehydrate(queryClient),
        searchQuery: tagName,
        tagId: Number(tagId),
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
export default ExploreByTagPage;
