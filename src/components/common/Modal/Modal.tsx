import type { PropsWithChildren } from "react";
import { Children, createContext, isValidElement, useContext } from "react";

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

  const reactChildren = Children.toArray(children);

  const header = reactChildren.filter(
    (child) => isValidElement(child) && child.type === ModalHeaderType,
  );
  const footer = reactChildren.filter(
    (child) => isValidElement(child) && child.type === ModalFooterType,
  );

  const content = reactChildren.filter(
    (child) => isValidElement(child) && ![ModalFooterType, ModalHeaderType].includes(child.type),
  );

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
          <article className="relative m-auto rounded-24 border border-gray-400 bg-white" ref={ref}>
            {header}
            <section className="px-16">{content}</section>
            {footer}
          </article>
        </div>
      </Portal>
    </ModalContext.Provider>
  );
};

const ModalHeader = () => {
  const { onClose } = useContext(ModalContext);
  return (
    <header className="relative flex h-72 items-center justify-between px-24">
      <Icon name="logo" />
      <button onClick={onClose}>
        <Icon name="cancel" />
      </button>
    </header>
  );
};
const ModalHeaderType = (<ModalHeader />).type;

const ModalFooter = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return (
    <footer className={`-ml-1 -mr-1 -mb-1 overflow-hidden rounded-b-24 ${className}`}>
      {children}
    </footer>
  );
};
const ModalFooterType = (<ModalFooter />).type;

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
