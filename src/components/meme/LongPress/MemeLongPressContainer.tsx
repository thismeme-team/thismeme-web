import type { PropsWithChildren } from "react";
import { useState } from "react";

import { useLongPress } from "@/application/hooks";
import type { Meme } from "@/types";

import { MemeLongPress } from "./MemeLongPress";

// NOTE: 롱프레스가 닫힌 상태를 표현하기 위해 존재할 수 없는 Meme ID를 주었습니다
const LONG_PRESS_CLOSED = -1;

export const MemeLongPressContainer = ({
  memeList,
  children,
}: PropsWithChildren<{ memeList: Meme[] }>) => {
  const [currentMemeId, setCurrentMemeId] = useState(LONG_PRESS_CLOSED);

  const longPress = useLongPress(
    (event) => {
      const memeId = (event.target as HTMLElement).dataset.id;
      if (memeId && !isNaN(+memeId)) setCurrentMemeId(+memeId);
    },
    {
      threshold: 1000,
      cancelOnMovement: true,
    },
  );
  const currentMemeInfo = memeList.find((meme) => meme.memeId === currentMemeId);
  const isOpen = !!currentMemeInfo;

  return (
    <>
      <div
        {...longPress()}
        onContextMenu={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          // NOTE: 롱프레스가 open 된 상태에서 마우스를 뗄 시 뒤에 있는 <MemeItem />의 <Link />가 클릭 되는 것을 막습니다
          if (isOpen) e.preventDefault();
        }}
      >
        {children}
      </div>
      <MemeLongPress
        isOpen={isOpen}
        meme={currentMemeInfo}
        onClose={() => setCurrentMemeId(LONG_PRESS_CLOSED)}
      />
    </>
  );
};
