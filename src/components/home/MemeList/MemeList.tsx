import { css } from "twin.macro";

import { useGetPopularMemes, useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeItem } from "@/components/meme/MemeItem";

export const MemeList = () => {
  const { data: memeList, isFetching, fetchNextPage } = useGetPopularMemes();
  const ref = useIntersect(async () => {
    fetchNextPage();
  });

  return (
    <div
      css={[
        css`
          width: 100%;
          min-height: 300px;
        `,
      ]}
    >
      <Masonry columns={2} spacing={9}>
        {memeList.map((meme) => (
          <MemeItem key={meme.memeId} meme={meme} />
        ))}
      </Masonry>
      {!isFetching ? <div className="h-20" ref={ref}></div> : <div className="h-20"></div>}
    </div>
  );
};
