import { css } from "twin.macro";

import { useGetMemesByType, useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeItem } from "@/components/meme/MemeItem";

import { useMemeContext } from "../MemeContext";

export const MemeList = () => {
  const meme = useMemeContext();
  const { data: memeList, fetchNextPage } = useGetMemesByType(meme);

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
      <div className="h-20" ref={ref} />
    </div>
  );
};
