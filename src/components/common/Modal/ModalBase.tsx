import type { PropsWithChildren } from "react";

import { useClickOutside } from "@/application/hooks";

import { Portal } from "../Portal";

interface Props {
  onClose?: () => void;
}

export const ModalBase = ({ children, onClose, ...rest }: PropsWithChildren<Props>) => {
  const ref = useClickOutside({ onClose });

  return (
    <Portal id="modal-portal">
      <div
        className="absolute z-[1000] flex h-full w-full items-center overflow-auto bg-[#00000099]"
        ref={ref}
      >
        {children}
      </div>
    </Portal>
  );
};
