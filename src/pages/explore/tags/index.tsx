import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useGetMemesByTag, useIntersect } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Masonry } from "@/components/common/Masonry";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { Photo } from "@/components/common/Photo";
import { MemeItem } from "@/components/meme/MemeItem";

const ExploreByTagPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { data: memeList, isEmpty, fetchNextPage } = useGetMemesByTag(query.q as string);

  const ref = useIntersect(async () => {
    if (query.q) fetchNextPage();
  });

  if (isEmpty) {
    return (
      <>
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
      <ExplorePageNavigation title={`#${query.q}`} />

      <div className="flex flex-col items-center gap-8 bg-white py-16">
        <span className="text-black/[.3]">100개의 밈</span>
        <Button className="rounded-full bg-black px-24 py-10 text-15-semibold-130 text-white">
          태그 즐겨찾기
        </Button>
      </div>

      <Masonry columns={2} defaultColumns={2} defaultHeight={450} defaultSpacing={9} spacing={9}>
        {memeList.map((meme) => (
          <MemeItem key={meme.memeId} meme={meme} />
        ))}
      </Masonry>
      <div className="m-10" ref={ref}></div>
    </>
  );
};

export default ExploreByTagPage;
