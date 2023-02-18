import { useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeLongPressContainer } from "@/components/meme/LongPress";
import { MemeItem } from "@/components/meme/MemeItem";
import type { Meme } from "@/types";

interface Props {
  memeList: Meme[];
  onEndReached: () => void;
}

export const InfiniteMemeList = ({ memeList, onEndReached }: Props) => {
  const ref = useIntersect(onEndReached);

  return (
    <MemeLongPressContainer memeList={memeList}>
      <Masonry columns={2} spacing={9}>
        {memeList.map((meme) => (
          <MemeItem key={meme.memeId} meme={meme} />
        ))}
      </Masonry>
      <div className="h-20" ref={ref} />
    </MemeLongPressContainer>
  );
};
