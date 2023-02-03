import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { useGetMemesByTag, useIntersect } from "@/application/hooks";
import { TITLE } from "@/application/util";
import { Masonry } from "@/components/common/Masonry";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { Photo } from "@/components/common/Photo";
import { MemeItem } from "@/components/meme/MemeItem";
import { TagFavoriteButton } from "@/components/tags";

const ExploreByTagPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { data: memeList, isEmpty, isLoading, fetchNextPage } = useGetMemesByTag(query.q as string);

  const ref = useIntersect(async () => {
    fetchNextPage();
  });

  if (isEmpty) {
    return (
      <>
        <Head>
          <title>{TITLE.getExploreByTagPageTitle(query.q as string)}</title>
          <meta content={TITLE.getExploreByTagPageTitle(query.q as string)} property="og:title" />
          <meta content={`${query.q} 밈 모음`} property="og:description" />
        </Head>

        <ExplorePageNavigation title={`#${query.q}`} />
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Photo className="w-200" src="/img/emptyAvatar.png" />
          <span className="text-15-semibold-130">악, 아직 이 밈은 없나봐요.</span>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{TITLE.getExploreByTagPageTitle(query.q as string)}</title>
        <meta content={TITLE.getExploreByTagPageTitle(query.q as string)} property="og:title" />
        <meta content={`${query.q} 밈 모음`} property="og:description" />
      </Head>

      <ExplorePageNavigation title={`#${query.q}`} />

      <Masonry columns={2} defaultColumns={2} defaultHeight={450} defaultSpacing={9} spacing={9}>
        {memeList.map((meme) => (
          <MemeItem key={meme.memeId} meme={meme} />
        ))}
      </Masonry>
      <div className={`m-10 ${isLoading ? "hidden" : ""}`} ref={ref}></div>

      <TagFavoriteButton />
    </>
  );
};

export default ExploreByTagPage;
