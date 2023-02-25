import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Suspense } from "react";

import { ExplorePageNavigation } from "@/components/common/Navigation";
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

interface Props {
  id: string;
}

const MemeDetailPage: NextPage<Props> = ({ id }) => {
  return (
    <>
      <ExplorePageNavigation />

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

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string;

  if (isNaN(+id))
    return {
      notFound: true,
    };

  return {
    props: {
      id,
    },
  };
};

export default MemeDetailPage;
