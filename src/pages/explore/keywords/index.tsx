import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { useGetSearchResultsByKeyword, useIntersect } from "@/application/hooks";
import { Navigation } from "@/components/common/Navigation";
import { MemeItem, MemeList } from "@/components/meme/MemeList";

const ExploreWordsPage: NextPage = () => {
  const { query } = useRouter();
  /**
   * FIX
   * 1. query.q가 string일 때만 memeList을 불러올 수 있도록 방어코드 작성해야함(현재는 타입단언으로 타입 에러만 안나도록 해두었음)
   */
  const { data, hasNextPage, isFetching, fetchNextPage } = useGetSearchResultsByKeyword(
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
      <Navigation page="result" title={query.q} />
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

export default ExploreWordsPage;
