import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { useGetMemesByTag, useIntersect } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Masonry } from "@/components/common/Masonry";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { Photo } from "@/components/common/Photo";
import { MemeItem } from "@/components/meme/MemeItem";

const ExploreTagsPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { data: memeList, isEmpty, fetchNextPage } = useGetMemesByTag(query.q as string);

  const onIntersect = useCallback(async () => {
    if (query.q) fetchNextPage();
  }, [query, fetchNextPage]);
  const ref = useIntersect(onIntersect);

  return (
    <>
      <ExplorePageNavigation title={`#${query.q}`} />
      <div className="flex flex-col items-center bg-white pt-16">
        <span className="text-black/[.3]">100개의 밈</span>
        <Button size="large">태그 즐겨찾기</Button>
      </div>
      {isEmpty && (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Photo className="w-200" src="/img/emptyAvatar.png" />
          <span className="text-15-semibold-130">악, 아직 이 밈은 없나봐요.</span>
        </div>
      )}
      {!isEmpty && (
        <>
          <Masonry
            columns={2}
            defaultColumns={2}
            defaultHeight={450}
            defaultSpacing={9}
            spacing={9}
          >
            {memeList.map((meme) => {
              return <MemeItem key={meme.memeId} meme={meme} />;
            })}
          </Masonry>
          <div className="m-10" ref={ref}></div>
        </>
      )}
    </>
  );
};

export default ExploreTagsPage;
