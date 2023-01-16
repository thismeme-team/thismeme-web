import { useCallback, useMemo } from "react";

import { useGetPopularMeme, useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeItem } from "@/components/meme/MemeItem";

export const PopularMemeList = () => {
  const { data, fetchNextPage } = useGetPopularMeme();

  const memeList = useMemo(() => (data ? data.pages.flatMap(({ data }) => data) : []), [data]);

  const onIntersect = useCallback(async () => {
    fetchNextPage();
  }, [fetchNextPage]);

  const ref = useIntersect(onIntersect);
  return (
    <>
      <Masonry columns={2} defaultColumns={2} defaultHeight={450} defaultSpacing={9} spacing={9}>
        {memeList.map((meme) => {
          return <MemeItem key={meme.memeId} meme={meme} />;
        })}
      </Masonry>
      <div className="m-10" ref={ref}></div>
    </>
  );
};
