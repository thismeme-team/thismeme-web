import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import { useGetSearchResultsByTag, useIntersect } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Masonry } from "@/components/common/Masonry";
import { Navigation } from "@/components/common/Navigation";
import { MemeItem } from "@/components/meme/MemeItem";

const ExploreTagsPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { data, fetchNextPage } = useGetSearchResultsByTag(query.q as string);
  const memeList = useMemo(() => (data ? data.pages.flatMap(({ data }) => data) : []), [data]);

  const onIntersect = useCallback(async () => {
    if (query.q) fetchNextPage();
  }, [query, fetchNextPage]);
  const ref = useIntersect(onIntersect);

  return (
    <>
      <Navigation page="result" title={`#${query.q}`} />
      <div className="flex flex-col items-center bg-white pt-16">
        <span className="text-black/[.3]">100개의 밈</span>
        <Button size="large">태그 즐겨찾기</Button>
      </div>
      <Masonry columns={2} defaultColumns={2} defaultHeight={450} defaultSpacing={9} spacing={9}>
        {memeList.map((meme) => {
          return <MemeItem key={meme.id} meme={meme} />;
        })}
      </Masonry>
      <div className="m-10" ref={ref}></div>
    </>
  );
};

export default ExploreTagsPage;
