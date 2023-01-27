import Link from "next/link";
import { memo, useCallback } from "react";

import { useLongPress, useModal } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";
import { MemeLongPress } from "@/components/common/LongPress";
import { Photo } from "@/components/common/Photo";
import type { Meme } from "@/types";

interface Props {
  meme: Meme;
}
export const MemeItem = memo(({ meme }: Props) => {
  const { modalOpen, onOpen, onClose } = useModal();

  const callBack = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const longPress = useLongPress(callBack, {
    threshold: 1300,
  });

  return (
    <div {...longPress()}>
      {modalOpen && <MemeLongPress onClose={onClose} />}
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
