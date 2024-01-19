import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { useGetMemesByTag } from "@/api/search";
import { useGetTagInfo } from "@/api/tag";
import { ExplorePageNavigation } from "@/common/components/Navigation";
import { NextSeo } from "@/common/components/NextSeo";
import { PullToRefresh } from "@/common/components/PullToRefresh";
import { MemeListSkeleton } from "@/common/components/Skeleton";
import { SSRSuspense } from "@/common/components/Suspense";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/common/utils";
import { MemesByTag, TagBookmarkButton, Thumbnail } from "@/features/explore/tags/components";

interface Props {
  tagName: string;
  tagId: number;
}

const ExploreByTagPage: NextPage<Props> = ({ tagName, tagId }) => {
  return (
    <>
      <NextSeo
        description={DEFAULT_DESCRIPTION}
        title={`'${tagName}' 밈`}
        openGraph={{
          siteName: SITE_NAME,
          imageUrl: `/api/og?tag=${tagName}`,
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <ExplorePageNavigation title={`#${tagName}`} />

      <PullToRefresh>
        <SSRSuspense fallback={<MemeListSkeleton />}>
          <Thumbnail tag={tagName} />
          <MemesByTag tagName={tagName} />
        </SSRSuspense>
      </PullToRefresh>
      <SSRSuspense fallback={<></>}>
        <TagBookmarkButton tagId={tagId} />
      </SSRSuspense>
      {/* <TagBookmarkButton tagId={tagId} /> */}
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
    const { name: tagName } = await useGetTagInfo.fetchQuery(Number(tagId), queryClient);

    // NOTE: tag name 이 api request 값이기 때문에 waterfall 한 fetching 이 필요합니다
    // await useGetMemesByTag.fetchInfiniteQuery(tagName, queryClient);

    return {
      props: {
        // NOTE: useInfiniteQuery 사용 시 queryCache에 undefined 프로퍼티가 있으므로 에러 방지를 위해 직렬화/역직렬화가 필요합니다
        // hydrateState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        tagName: tagName,
        tagId: Number(tagId),
      },
      revalidate: 60 * 20, // 20분
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
export default ExploreByTagPage;
