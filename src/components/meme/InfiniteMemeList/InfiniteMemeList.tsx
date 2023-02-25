import { useMemo } from "react";

import { useIntersect } from "@/application/hooks";
import { Masonry } from "@/components/common/Masonry";
import { renderMemeItemSkeletons } from "@/components/common/Skeleton";
import { MemeLongPressContainer } from "@/components/meme";
import { MemeItem } from "@/components/meme/MemeItem";
import type { Meme } from "@/types";

const skeletons = renderMemeItemSkeletons(4);

const builder = ({ elements, loading = false }: { elements: JSX.Element[]; loading?: boolean }) => {
  if (loading) return elements.concat(skeletons);
  return elements;
};

interface InfiniteMemeListProps {
  memeList: Meme[];
  loading?: boolean;
  onRequestAppend: () => void;
}

export const InfiniteMemeList = ({
  memeList,
  loading = false,
  onRequestAppend,
}: InfiniteMemeListProps) => {
  const ref = useIntersect(onRequestAppend, { rootMargin: "200% 0px" });

  const elements = useMemo(
    () =>
      memeList.map((meme) => {
        return (
          <MemeLongPressContainer key={meme.memeId} meme={meme}>
            <MemeItem meme={meme} />
          </MemeLongPressContainer>
        );
      }),
    [memeList],
  );

  return (
    <>
      <Masonry columns={2} spacing={9}>
        {builder({ elements, loading })}
      </Masonry>
      <div className="h-20" ref={ref} />
    </>
  );
};
