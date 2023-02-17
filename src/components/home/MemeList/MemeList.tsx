import { useGetPopularMemes, useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeLongPressContainer } from "@/components/meme/LongPress";
import { MemeItem } from "@/components/meme/MemeItem";

export const MemeList = () => {
  const { data: memeList, fetchNextPage } = useGetPopularMemes();
  const ref = useIntersect(async () => {
    fetchNextPage();
  });

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
