import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { useGetSearchResultsByKeyword, useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { Navigation } from "@/components/common/Navigation";
import { MemeItem } from "@/components/meme/MemeItem";

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
      <Masonry columns={2} defaultColumns={2} defaultHeight={450} defaultSpacing={9} spacing={9}>
        {memeList.map((meme) => {
          return <MemeItem key={meme.id} meme={meme} />;
        })}
        <div className="h-10" ref={ref}></div>
      </Masonry>
      {isFetching && <div>loading...</div>}
    </>
  );
};

export default ExploreWordsPage;
