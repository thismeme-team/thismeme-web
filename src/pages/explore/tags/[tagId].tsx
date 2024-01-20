import { QueryClient } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { useGetTagInfo } from "@/api/tag";
import { ExplorePageNavigation } from "@/common/components/Navigation";
import { NextSeo } from "@/common/components/NextSeo";
import { PullToRefresh } from "@/common/components/PullToRefresh";
import { MemeListSkeleton } from "@/common/components/Skeleton";
import { SSRSuspense } from "@/common/components/Suspense";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/common/utils";
import { MemesByTagsContainer, TagBookmarkButton } from "@/features/explore/tags/components";

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
          <MemesByTagsContainer tag={tagName} />
        </SSRSuspense>
      </PullToRefresh>
      <SSRSuspense fallback={<></>}>
        <TagBookmarkButton tagId={tagId} />
      </SSRSuspense>
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

    return {
      props: {
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
