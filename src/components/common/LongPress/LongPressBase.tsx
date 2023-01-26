import type { PropsWithChildren } from "react";

import { useClickOutside } from "@/application/hooks";

import { Portal } from "../Portal";

interface Props {
  onClose?: () => void;
}

export const LongPressBase = ({ children, onClose, ...rest }: PropsWithChildren<Props>) => {
  const ref = useClickOutside({ onClose });

  return (
    <Portal id="longpress-base">
      <div className="absolute z-[1300] flex h-full w-full items-center overflow-auto" ref={ref}>
        {children}
      </div>
    </Portal>
  );
};
