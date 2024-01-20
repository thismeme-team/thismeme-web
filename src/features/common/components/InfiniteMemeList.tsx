import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";

import { MemeItem } from "@/features/common";
import type { Meme } from "@/types";

interface InfiniteMemeListProps {
  memeList: Meme[];
  onRequestAppend: () => void;
}

export const InfiniteMemeList = ({ memeList, onRequestAppend }: InfiniteMemeListProps) => {
  return (
    <>
      <MasonryInfiniteGrid className="w-full" gap={9} onRequestAppend={onRequestAppend}>
        {memeList.map((meme) => (
          <MemeItem key={meme.memeId} meme={meme} />
        ))}
      </MasonryInfiniteGrid>
    </>
  );
};
