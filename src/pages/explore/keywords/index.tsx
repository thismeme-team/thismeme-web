import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

import { useGetMemesByKeyword, useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { ExplorePageNavigation } from "@/components/common/Navigation";
import { MemeItem } from "@/components/meme/MemeItem";

const ExploreWordsPage: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const { data, fetchNextPage } = useGetMemesByKeyword(query.q as string);

  const memeList = useMemo(() => (data ? data.pages.flatMap(({ data }) => data) : []), [data]);

  const onIntersect = useCallback(async () => {
    if (query.q) fetchNextPage();
  }, [query, fetchNextPage]);

  const ref = useIntersect(onIntersect);

  return (
    <>
      <ExplorePageNavigation title={query.q as string} />
      <Masonry columns={2} defaultColumns={2} defaultHeight={450} defaultSpacing={9} spacing={9}>
        {memeList.map((meme) => {
          return <MemeItem key={meme.memeId} meme={meme} />;
        })}
      </Masonry>
      <div className="m-10" ref={ref}></div>
    </>
  );
};

export default ExploreWordsPage;
