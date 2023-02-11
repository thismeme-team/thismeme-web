import Link from "next/link";
import { memo, useCallback } from "react";

import { useLongPress, useModal } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";
import type { Meme } from "@/types";

import { MemeLongPress } from "../MemeLongPress";

interface Props {
  meme: Meme;
}
export const MemeItem = memo(({ meme }: Props) => {
  const { open, onOpen, onClose } = useModal();

  const callBack = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const longPress = useLongPress(callBack, {
    threshold: 1300,
  });

  return (
    <div {...longPress()}>
      {open && <MemeLongPress onClose={onClose} />}
      <Link className="flex flex-col gap-6" href={`/memes/${meme.memeId}`} prefetch={false}>
        <Photo
          alt={meme.name}
          className="rounded-15"
          height={meme.image.images[0]?.imageHeight}
          src={meme.image.images[0]?.imageUrl}
          width={meme.image.images[0]?.imageWidth}
        />
        <div className="flex items-center justify-between font-suit text-14-semibold-140">
          <span>{meme.name}</span>
          <span className="flex items-center">
            <Icon height={16} name="memeShare" width={16} />
            <span className="text-gray-600">{meme.shareCount}</span>
          </span>
        </div>
      </Link>
    </div>
  );
});

MemeItem.displayName = "MemeItem";
