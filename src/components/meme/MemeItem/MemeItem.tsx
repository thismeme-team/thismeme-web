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

export const MemeItem = memo(({ meme: { name, image, memeId }, onClick }: Props) => {
  return (
    <div className="mb-15 flex flex-col">
      <Link
        scroll
        draggable={false}
        href={`/memes/${memeId}`}
        prefetch={false}
        onClick={() => onClick?.(memeId)}
      >
        <Photo
          alt={name}
          className="rounded-16"
          draggable={false}
          height={image.images[0]?.imageHeight}
          sizes="100px"
          src={image.images[0]?.imageUrl}
          unoptimized={isEncodingError(image.images[0]?.imageUrl)}
          width={image.images[0]?.imageWidth}
        />
      </Link>
      <div className="flex justify-between gap-6">
        <Link
          scroll
          className="py-4"
          draggable={false}
          href={`/memes/${memeId}`}
          prefetch={false}
          onClick={() => onClick?.(memeId)}
        >
          <span className="text-11-semibold-140">{name}</span>
        </Link>
        <span className="flex h-24 w-24 items-center justify-center">
          <Icon color="gray-600" height={16} name="meatball" width={16} />
        </span>
      </div>
    </div>
  );
});

MemeItem.displayName = "MemeItem";
