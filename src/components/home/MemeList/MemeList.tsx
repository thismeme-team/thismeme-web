import { Masonry } from "@/components/common/Masonry";
import { MemeItem } from "@/components/meme/MemeItem";
import type { Meme } from "@/types";

interface Props {
  memeList: Meme[];
}

export const MemeList = ({ memeList }: Props) => {
  return (
    <Masonry columns={2} spacing={9}>
      {memeList.map((meme) => (
        <MemeItem key={meme.memeId} meme={meme} />
      ))}
    </Masonry>
  );
};
