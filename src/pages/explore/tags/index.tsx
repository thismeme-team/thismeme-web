import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { useGetSearchResultsByTag, useIntersect } from "@/application/hooks";
import { Button } from "@/components/common/Button";
import { Navigation } from "@/components/common/Navigation";
import { MemeItem, MemeList } from "@/components/meme/MemeList";

const ExploreTagsPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  /**
   * FIX
   * 1. query.q가 string일 때만 memeList을 불러올 수 있도록 방어코드 작성해야함(현재는 타입단언으로 타입 에러만 안나도록 해두었음)
   */
  const { data, hasNextPage, isFetching, fetchNextPage } = useGetSearchResultsByTag(
    query.q as string,
  );
  const memeList = useMemo(() => (data ? data.pages.flatMap(({ data }) => data) : []), [data]);

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });
  return (
    <>
      <Navigation page="result" title={`#${query.q}`} />
      <div className="flex flex-col items-center bg-white pt-16">
        <span className="text-black/[.3]">100개의 밈</span>
        <Button size="large">태그 즐겨찾기</Button>
      </div>
      <MemeList>
        {memeList.map((meme) => (
          <MemeItem key={meme.id} meme={meme} />
        ))}
        <div className="h-[1px]" ref={ref} />
      </MemeList>
      {isFetching && <div>loading...</div>}
    </>
  );
};

export default ExploreTagsPage;
