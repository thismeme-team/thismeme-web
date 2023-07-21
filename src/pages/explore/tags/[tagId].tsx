import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { useGetTagInfo } from "@/api/tag";
import { prefetchMemesByTag } from "@/application/hooks";
import { ExplorePageNavigation } from "@/common/components/Navigation";
import { NextSeo } from "@/common/components/NextSeo";
import { PullToRefresh } from "@/common/components/PullToRefresh";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/common/utils";
import { MemesByTag, TagBookmarkButton, Thumbnail } from "@/features/explore/tags/components";

interface Props {
  searchQuery: string;
  tagId: number;
}

const ExploreByTagPage: NextPage<Props> = ({ searchQuery, tagId }) => {
  return (
    <>
      <NextSeo
        description={DEFAULT_DESCRIPTION}
        title={`'${searchQuery}' 밈`}
        openGraph={{
          siteName: SITE_NAME,
          imageUrl: `/api/og?tag=${searchQuery}`,
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <ExplorePageNavigation title={`#${searchQuery}`} />

      <PullToRefresh>
        <Thumbnail tag={searchQuery} />
        <MemesByTag searchQuery={searchQuery} />
      </PullToRefresh>
      <TagBookmarkButton tagId={tagId} />
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
    await prefetchMemesByTag(tagName, queryClient);

    return {
      props: {
        // NOTE: useInfiniteQuery 사용 시 queryCache에 undefined 프로퍼티가 있으므로 에러 방지를 위해 직렬화/역직렬화가 필요합니다
        hydrateState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        searchQuery: tagName,
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
