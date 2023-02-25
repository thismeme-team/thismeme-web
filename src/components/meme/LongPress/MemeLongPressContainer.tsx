import type { PropsWithChildren } from "react";
import { memo } from "react";

import { useLongPress, useModal } from "@/application/hooks";
import { OverLay } from "@/components/common/Overlay";
import { MemeLongPress } from "@/components/meme";
import type { Meme } from "@/types";

interface Props {
  meme: Meme;
}

export const MemeLongPressContainer = memo(({ meme, children }: PropsWithChildren<Props>) => {
  const { open, onOpen, onClose } = useModal();

  const longPress = useLongPress(onOpen, {
    threshold: 1000,
    cancelOnMovement: true,
  });

  return (
    <>
      <div {...longPress()} onContextMenu={(e) => e.preventDefault()}>
        {children}
      </div>
      <OverLay isOpen={open} onBackdropClick={onClose}>
        {(state) => <MemeLongPress isOpen={state === "entered"} meme={meme} onClose={onClose} />}
      </OverLay>
    </>
  );
});

MemeLongPressContainer.displayName = "MemoizedMemeLongPressContainer";
