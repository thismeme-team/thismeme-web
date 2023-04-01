import type { ReactNode } from "react";
import { memo } from "react";

import { useModal } from "@/application/hooks";
import { Overlay } from "@/components/common/Overlay";
import { MemeActionSheet } from "@/components/meme";
import type { Meme } from "@/types";

interface Props {
  meme: Meme;
  isCollection?: boolean;
  children: ((args: ReturnType<typeof useModal>) => ReactNode) | ReactNode;
}

export const MemeActionSheetContainer = memo(({ meme, isCollection = false, children }: Props) => {
  const { open, onOpen, onClose } = useModal();

  return (
    <>
      <div onContextMenu={(e) => e.preventDefault()}>
        {typeof children === "function" ? children({ open, onOpen, onClose }) : children}
      </div>
      <Overlay isOpen={open} onBackdropClick={onClose}>
        {(state) => (
          <MemeActionSheet
            isCollection={isCollection}
            isOpen={state === "entered"}
            meme={meme}
            onClose={onClose}
          />
        )}
      </Overlay>
    </>
  );
});

MemeActionSheetContainer.displayName = "MemoizedMemeActionSheetContainer";
