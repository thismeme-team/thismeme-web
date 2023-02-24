import type { ReactNode } from "react";

import { useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeLongPressContainer } from "@/components/meme";
import { MemeItem } from "@/components/meme/MemeItem";
import type { Meme } from "@/types";

interface Props {
  memeList: Meme[];
  onEndReached: () => void;
  render?: (meme: Meme) => ReactNode;
}

export const MasonryInfiniteGrid = ({ memeList, onEndReached, render }: Props) => {
  const ref = useIntersect(onEndReached);

  return (
    <>
      <Masonry columns={2} spacing={9}>
        {memeList.map((meme) =>
          render ? (
            render(meme)
          ) : (
            <MemeLongPressContainer key={meme.memeId} meme={meme}>
              <MemeItem meme={meme} />
            </MemeLongPressContainer>
          ),
        )}
      </Masonry>
      <div className="h-20" ref={ref} />
    </>
  );
};
