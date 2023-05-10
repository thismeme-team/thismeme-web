import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Suspense } from "react";

import { fetchMemeDetailById, fetchMemeTagsById } from "@/application/hooks";
import { SITE_NAME } from "@/application/util";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { MemeListSkeleton, Skeleton } from "@/components/common/Skeleton";
import { SSRSuspense } from "@/components/common/Suspense";
import {
  MemeCTAList,
  MemeDetail,
  MemeTagList,
  RelativeMemeList,
  SkeletonMemeDetail,
  SkeletonMemeTagList,
} from "@/components/meme";
import type { DefaultPageProps, Meme } from "@/types";

interface Props {
  id: string;
  meme: Pick<Meme, "name" | "description" | "image">;
}

const MemeDetailPage: NextPage<Props> = ({ id, meme: { name, description, image } }) => {
  return (
    <>
      <ExplorePageNavigation />
      <NextSeo
        description={description}
        title={name}
        openGraph={{
          siteName: SITE_NAME,
          imageUrl: image.images[0].imageUrl,
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <SSRSuspense fallback={<SkeletonMemeDetail />} key={id}>
        <MemeDetail id={id} />
        <Suspense fallback={<SkeletonMemeTagList />}>
          <MemeTagList id={id} />
        </Suspense>
        <MemeCTAList id={id} />
      </SSRSuspense>

      <SSRSuspense
        fallback={
          <>
            <Skeleton
              style={{
                fontSize: "2.2rem",
                width: "50%",
                marginTop: "1.6rem",
                marginBottom: "1.6rem",
              }}
            />
            <MemeListSkeleton />
          </>
        }
      >
        <RelativeMemeList />
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

export const getStaticProps: GetStaticProps<
  DefaultPageProps & Props,
  Partial<Pick<Props, "id">>
> = async ({ params }) => {
  const id = params?.id as string;
  const queryClient = new QueryClient();

  try {
    const [{ description, name, image }] = await Promise.all([
      fetchMemeDetailById(id, queryClient),
      fetchMemeTagsById(id, queryClient),
    ]);

    return {
      props: {
        hydrateState: dehydrate(queryClient),
        id,
        meme: {
          description,
          name,
          image,
        },
      },
      revalidate: 60 * 10, // 10분
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default MemeDetailPage;
