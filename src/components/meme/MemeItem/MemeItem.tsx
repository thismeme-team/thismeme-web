import { memo } from "react";

import { useMoveMemeDetail, useOverlay } from "@/application/hooks";
import { isEncodingError } from "@/application/util";
import { Icon } from "@/components/common/Icon";
import { Photo } from "@/components/common/Photo";
import type { Meme } from "@/types";

import { MemeActionSheet } from "../ActionSheet";

interface Props {
  meme: Meme;
  onClick?: (id: number) => void;
}

export const MemeItem = memo(({ meme, onClick }: Props) => {
  const overlay = useOverlay();
  const { movePage } = useMoveMemeDetail();
  const { name, image, memeId } = meme;

  return (
    <div className="mb-15 flex flex-col">
      <button
        draggable={false}
        onClick={() => {
          onClick?.(memeId);
          movePage(memeId);
        }}
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
      </button>
      <div className="flex justify-between gap-6">
        <button
          className="py-4 text-start"
          onClick={() => {
            onClick?.(memeId);
            movePage(memeId);
          }}
        >
          <span className="text-12-medium-160 line-clamp-2">{name}</span>
        </button>
        <button
          className="flex h-32 w-32 justify-center"
          onClick={() => {
            overlay.open(({ isOpen, close }) => (
              <MemeActionSheet isOpen={isOpen} meme={meme} onClose={close} />
            ));
          }}
        >
          <Icon color="gray-600" height={20} name="meatball" width={20} />
        </button>
      </div>
    </div>
  );
});

MemeItem.displayName = "MemeItem";
