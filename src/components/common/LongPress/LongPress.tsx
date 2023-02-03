import type { PropsWithChildren } from "react";

import { useClickOutside } from "@/application/hooks";

import { Portal } from "../Portal";

interface Props {
  onClose: () => void;
}

export const LongPress = ({ children, onClose }: PropsWithChildren<Props>) => {
  const ref = useClickOutside({ onClose });

  return (
    <Portal id="longpress-portal">
      <div className="absolute z-[1300] flex h-full w-full items-center">
        <article className="m-auto" ref={ref}>
          {children}
        </article>
      </div>
    </Portal>
  );
};
