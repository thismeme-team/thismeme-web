import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useGetMemesByKeyword, useIntersect } from "@/application/hooks";
import { TITLE } from "@/application/util";
import { Masonry } from "@/components/common/Masonry";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { EmptyMemesView } from "@/components/explore";
import { MemeItem } from "@/components/meme/MemeItem";

const ExploreByKeywordPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const {
    data: memeList,
    isEmpty,
    isLoading,
    fetchNextPage,
  } = useGetMemesByKeyword(query.q as string);

  const ref = useIntersect(async () => {
    fetchNextPage();
  });

  if (isEmpty) {
    return (
      <>
        <NextSeo
          description={`${query.q} 밈 모음`}
          title={TITLE.exploreByKeyword(query.q as string)}
        />

        <ExplorePageNavigation title={query.q as string} />

        <EmptyMemesView />
      </>
    );
  }
  return (
    <>
      <NextSeo
        description={`${query.q} 밈 모음`}
        title={TITLE.exploreByKeyword(query.q as string)}
      />

      <ExplorePageNavigation title={query.q as string} />
      <Masonry
        className="mt-12"
        columns={2}
        defaultColumns={2}
        defaultHeight={450}
        defaultSpacing={9}
        spacing={9}
      >
        {memeList.map((meme) => (
          <MemeItem key={meme.memeId} meme={meme} />
        ))}
      </Masonry>
      <div className={`m-10 ${isLoading ? "hidden" : ""}`} ref={ref}></div>
    </>
  );
};

export default ExploreByKeywordPage;
