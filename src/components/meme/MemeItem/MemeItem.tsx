import Link from "next/link";
import { memo } from "react";

import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";
import type { Meme } from "@/infra/api/meme/types";

interface Props {
  meme: Meme;
}
export const MemeItem = memo(({ meme }: Props) => {
  return (
    <Link className="flex flex-col gap-6" href={`/meme/${meme.memeId}`}>
      <Photo className="rounded-15" src={meme.image.images[0].imageUrl} />
      <div className="flex items-center justify-between">
        <span className="text-12-bold-160">{meme.name}</span>
        <span className="flex items-center text-12-regular-160">
          <Icon name="memeShare" />
          {meme.shareCount}
        </span>
      </div>
    </Link>
  );
});

MemeItem.displayName = "MemeItem";
