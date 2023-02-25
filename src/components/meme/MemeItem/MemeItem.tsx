import Link from "next/link";
import { memo } from "react";

import { isEncodingError } from "@/application/util";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";
import type { Meme } from "@/types";

interface Props {
  meme: Meme;
  onClick?: (id: number) => void;
}

export const MemeItem = memo(({ meme: { name, image, memeId, shareCount }, onClick }: Props) => {
  return (
    <Link
      scroll
      className="flex flex-col gap-6"
      draggable={false}
      href={`/memes/${memeId}`}
      prefetch={false}
      onClick={() => onClick?.(memeId)}
    >
      <Photo
        alt={name}
        className="rounded-15"
        draggable={false}
        height={image.images[0]?.imageHeight}
        sizes="100px"
        src={image.images[0]?.imageUrl}
        unoptimized={isEncodingError(image.images[0]?.imageUrl)}
        width={image.images[0]?.imageWidth}
      />
      <div className="flex items-center justify-between font-suit text-14-semibold-140">
        <span>{name}</span>
        <span className="flex items-center gap-4">
          <Icon height={16} name="memeShare" width={16} />
          <span className="text-gray-600">{shareCount}</span>
        </span>
      </div>
    </Link>
  );
});

MemeItem.displayName = "MemeItem";
