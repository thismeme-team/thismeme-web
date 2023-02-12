import { useGetPopularMemes, useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { MemeItem } from "@/components/meme/MemeItem";

export const MemeList = () => {
  const { data: memeList, fetchNextPage } = useGetPopularMemes();
  const ref = useIntersect(async () => {
    fetchNextPage();
  });

  return (
    <>
      <Masonry columns={2} defaultColumns={2} defaultHeight={450} defaultSpacing={9} spacing={9}>
        {memeList.map((meme) => (
          <MemeItem key={meme.memeId} meme={meme} />
        ))}
      </Masonry>
      <div className="h-10" ref={ref}></div>
    </>
  );
};
