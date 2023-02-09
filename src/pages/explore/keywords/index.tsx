import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { useGetMemesByKeyword, useIntersect } from "@/application/hooks";
import { TITLE } from "@/application/util";
import { Masonry } from "@/components/common/Masonry";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { NextSeo } from "@/components/common/NextSeo";
import { RandomImage } from "@/components/common/RandomImge";
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
        <div className="flex h-full w-full flex-col items-center justify-center font-suit">
          <span className="flex items-center text-32-bold-140">
            당신이 찾는{" "}
            <Link href="/">
              <RandomImage className="h-32 w-32 rounded-8" />
            </Link>
            은
          </span>
          <span className="text-32-bold-140">아직 없나봐요</span>
          <span className="mt-24 text-center text-16-semibold-140 text-gray-600">
            다른 키워드로 검색하거나
            <br />
            밈의 바다에서 시핑해보세요!
          </span>
        </div>
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
      <Masonry columns={2} defaultColumns={2} defaultHeight={450} defaultSpacing={9} spacing={9}>
        {memeList.map((meme) => (
          <MemeItem key={meme.memeId} meme={meme} />
        ))}
      </Masonry>
      <div className={`m-10 ${isLoading ? "hidden" : ""}`} ref={ref}></div>
    </>
  );
};

export default ExploreByKeywordPage;
