import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Suspense } from "react";

import { prefetchMemeDetailById } from "@/application/hooks";
import { DEFAULT_DESCRIPTION, TITLE } from "@/application/util";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { SSRSuspense } from "@/components/common/Suspense";
import { MemeCTAList, MemeDetail, MemeTagList, RelativeMemeList } from "@/components/meme/MemeInfo";
import type { DefaultPageProps } from "@/types";

interface Props {
  id: string;
}

const MemeDetailPage: NextPage<Props> = ({ id }) => {
  return (
    <>
      <NextSeo description={DEFAULT_DESCRIPTION} title={TITLE.memeDetail} />
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

export const getStaticProps: GetStaticProps<DefaultPageProps & Props, Partial<Props>> = async ({
  params,
}) => {
  const id = params?.id;
  const queryClient = new QueryClient();

  /**
   * @todo
   *  1. 숫자 형식이 아닌 :id 요청 시 404 페이지로 이동
   *  2. 데이터가 없는 페이지 요청 시 404 페이지로 이동
   *    - id 값의 범위를 알아야 함
   *    - 관련 api 필요
   *    - try catch로 처리해 볼려 했으나, axios 500 에러를 제대로 catch 하지 못하는 이슈가 있어 실패
   */
  if (!id || isNaN(Number(id)))
    return {
      notFound: true,
    };

  await prefetchMemeDetailById(id, queryClient);

  return {
    props: {
      hydrateState: dehydrate(queryClient),
      id,
    },
  };
};

export default MemeDetailPage;
