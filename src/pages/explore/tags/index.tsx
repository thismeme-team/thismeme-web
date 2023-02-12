import type { NextPage } from "next";
import { useRouter } from "next/router";
import { css } from "twin.macro";

import { useGetMemesByTag, useIntersect } from "@/application/hooks";
import { TITLE } from "@/application/util";
import { Masonry } from "@/components/common/Masonry";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { EmptyMemesView } from "@/components/explore";
import { MemeItem } from "@/components/meme/MemeItem";
import { TagFavoriteButton } from "@/components/tags";

const ExploreByTagPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const {
    data: memeList,
    isEmpty,
    isFetching,
    fetchNextPage,
  } = useGetMemesByTag(query.q as string);

  const ref = useIntersect(async () => {
    fetchNextPage();
  });

  if (isEmpty) {
    return (
      <>
        <NextSeo description={`${query.q} 밈 모음`} title={TITLE.exploreByTag(query.q as string)} />

        <ExplorePageNavigation title={`#${query.q}`} />

        <EmptyMemesView />
      </>
    );
  }
  return (
    <>
      <NextSeo description={`${query.q} 밈 모음`} title={TITLE.exploreByTag(query.q as string)} />

      <ExplorePageNavigation title={`#${query.q}`} />

      <div
        css={[
          css`
            width: 100%;
            min-height: 450px;
            margin-top: 12rem;
          `,
        ]}
      >
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
        <div className={`m-10 ${isFetching ? "hidden" : ""}`} ref={ref}></div>
      </div>

      <TagFavoriteButton />
    </>
  );
};

export default ExploreByTagPage;
