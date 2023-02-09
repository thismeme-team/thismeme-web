import type { PropsWithChildren } from "react";
import { css } from "twin.macro";

import { useClickOutside } from "@/application/hooks";

import { Portal } from "../Portal";

interface Props {
  onClose: () => void;
}

export const LongPress = ({ children, onClose }: PropsWithChildren<Props>) => {
  const ref = useClickOutside({ onClose });

  return (
    <Portal id="longpress-portal">
      <div className="absolute z-[1300] flex h-full w-full items-center bg-black/50">
        <article
          className="absolute left-[50%] bottom-40"
          ref={ref}
          css={css`
            transform: translate(-50%, 0%);
          `}
        >
          {children}
        </article>
      </div>
    </Portal>
  );
};
