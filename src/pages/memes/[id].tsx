import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Suspense } from "react";

import { fetchMemeDetailById } from "@/application/hooks";
import { TITLE } from "@/application/util";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemeCTAList, MemeDetail, MemeTagList, RelativeMemeList } from "@/components/meme/MemeInfo";
import type { DefaultPageProps, Meme } from "@/types";

interface Props {
  id: string;
  meme: Pick<Meme, "name" | "description">;
}

const MemeDetailPage: NextPage<Props> = ({ id, meme: { name, description } }) => {
  return (
    <>
      <NextSeo description={description} title={TITLE.memeDetail(name)} />
      <ExplorePageNavigation />
      <Suspense>
        <MemeDetail id={id} />
        <MemeTagList id={id} />
        <MemeCTAList id={id} />
      </Suspense>
      <SSRSuspense>
        {/* NOTE: 클라이언트 사이드에서만 렌더링 */}
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
    const { description, name } = await fetchMemeDetailById(id, queryClient);
    return {
      props: {
        hydrateState: dehydrate(queryClient),
        id,
        meme: {
          description,
          name,
        },
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default MemeDetailPage;
