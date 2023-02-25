import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Suspense } from "react";

import { ExplorePageNavigation } from "@/components/common/Navigation";
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
        <Suspense>
          <RelativeMemeList />
        </Suspense>
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
