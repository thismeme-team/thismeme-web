import { useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeLongPressContainer } from "@/components/meme";
import { MemeItem } from "@/components/meme/MemeItem";
import type { Meme } from "@/types";

interface Props {
  memeList: Meme[];
  onEndReached: () => void;
}

export const InfiniteMemeList = ({ memeList, onEndReached }: Props) => {
  const ref = useIntersect(onEndReached);

  return (
    <>
      <Masonry columns={2} spacing={9}>
        {memeList.map((meme) => (
          <MemeLongPressContainer key={meme.memeId} meme={meme}>
            <MemeItem meme={meme} />
          </MemeLongPressContainer>
        ))}
      </Masonry>
      <div className="h-20" ref={ref} />
    </>
  );
};
