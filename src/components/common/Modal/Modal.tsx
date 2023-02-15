import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

import type { useModal } from "@/application/hooks";
import { useClickOutside } from "@/application/hooks";
import { fadeInOut } from "@/application/util/animation";
import { Icon } from "@/components/common/Icon";
import { Portal } from "@/components/common/Portal";

type ModalContextValue = ReturnType<typeof useModal>;
const ModalContext = createContext<ModalContextValue>(null as unknown as ModalContextValue);

export interface ModalProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const Modal = ({ children, open, onOpen, onClose }: PropsWithChildren<ModalProps>) => {
  const ref = useClickOutside({ onClose });

  return (
    <ModalContext.Provider value={{ open, onOpen, onClose }}>
      <Portal id="modal-portal">
        <div
          className="fixed inset-0 z-[1300] flex items-center bg-black/50 touch-none"
          css={fadeInOut(open)}
          onTouchEnd={(event) => {
            if (event.target === event.currentTarget) event.preventDefault();
          }}
        >
          <article className="m-auto rounded-10 border border-gray-400 bg-white px-16" ref={ref}>
            {children}
          </article>
        </div>
      </Portal>
    </ModalContext.Provider>
  );
};

const ModalHeader = () => {
  const { onClose } = useContext(ModalContext);
  return (
    <header className="relative flex h-72 items-center justify-between px-8">
      <Icon name="logo" />
      <button onClick={onClose}>
        <Icon name="cancel" />
      </button>
    </header>
  );
};

/**
 * @todo
 *   추후 submit 버튼 추가
 */

Modal.Header = ModalHeader;
