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
    window.navigator.vibrate(2000);
  }, [onOpen]);

  const longPress = useLongPress(callBack, {
    threshold: 1300,
  });

  return (
    <div {...longPress()}>
      {open && <MemeLongPress onClose={onClose} />}
      <Link className="flex flex-col gap-6" href={`/memes/${meme.memeId}`}>
        <Photo
          className="rounded-15"
          height={meme.image.images[0].imageHeight}
          src={meme.image.images[0].imageUrl}
          width={meme.image.images[0].imageWidth}
        />
        <div className="flex items-center justify-between">
          <span className="text-12-bold-160">{meme.name}</span>
          <span className="flex items-center text-12-regular-160">
            <Icon name="memeShare" />
            {meme.shareCount}
          </span>
        </div>
      </Link>
    </div>
  );
});

MemeItem.displayName = "MemeItem";
