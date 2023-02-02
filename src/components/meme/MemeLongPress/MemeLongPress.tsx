import { css, theme } from "twin.macro";

import { withDelay } from "@/application/util/delay";
import { LongPress } from "@/components/common/LongPress/LongPress";

interface Props {
  onClose: () => void;
}

export const MemeLongPress = ({ onClose }: Props) => {
  const delayClose = withDelay(onClose, 200);

  return (
    <LongPress onClose={delayClose}>
      <ul
        css={css`
          width: 24rem;
          overflow: hidden;
          border-radius: 10px;
          border: solid 1px ${theme`colors.gray.400`};
          background: white;
          transition: transform 0.4s ease, opacity 0.2s ease-in-out;
        `}
      >
        <li
          className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
          onPointerDown={delayClose}
        >
          콜렉션에 저장하기
        </li>
        <li
          className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
          onPointerDown={delayClose}
        >
          이미지 다운로드
        </li>
        <li
          className="flex h-56 items-center p-16 font-suit text-18-bold-140 hover:bg-primary-100"
          onPointerDown={delayClose}
        >
          공유하기
        </li>
      </ul>
    </LongPress>
  );
};
