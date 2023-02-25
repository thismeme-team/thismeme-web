import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Suspense } from "react";

import { ExplorePageNavigation } from "@/components/common/Navigation";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemeCTAList, MemeDetail, MemeTagList, RelativeMemeList } from "@/components/meme";

interface Props {
  id: string;
}

const MemeDetailPage: NextPage<Props> = ({ id }) => {
  // TODO increase view count

  return (
    <>
      <ExplorePageNavigation />
      <SSRSuspense>
        <MemeDetail id={id} />
        <MemeTagList id={id} />
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
