import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { fetchTagInfo, prefetchMemesByTag } from "@/application/hooks";
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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tagId = params?.tagId;
  const queryClient = new QueryClient();

  if (typeof tagId !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    const { name: tagName } = await fetchTagInfo(Number(tagId), queryClient);

    // NOTE: tag name 이 api request 값이기 때문에 waterfall 한 fetching 이 필요합니다
    await prefetchMemesByTag(tagName, queryClient);

    return {
      props: {
        // NOTE: useInfiniteQuery 사용 시 queryCache에 undefined 프로퍼티가 있으므로 에러 방지를 위해 직렬화/역직렬화가 필요합니다
        hydrateState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        searchQuery: tagName,
        tagId: Number(tagId),
      },
      revalidate: 60 * 10, // 10분
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
export default ExploreByTagPage;
