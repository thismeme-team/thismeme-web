import type { PropsWithChildren } from "react";
import { Children, createContext, isValidElement, useContext } from "react";

import { useClickOutside } from "@/common/hooks";
import { fadeInOut } from "@/common/utils";

import { Icon } from "../Icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalProps>(null as unknown as ModalProps);

export const Modal = ({ children, open, onClose }: PropsWithChildren<ModalProps>) => {
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
    <ModalContext.Provider value={{ open, onClose }}>
      <div
        className="fixed inset-0 z-[1300] flex touch-none items-center bg-black/50"
        css={fadeInOut(open)}
        onTouchEnd={(event) => {
          if (event.target === event.currentTarget) event.preventDefault();
        }}
      >
        <article
          className="relative m-auto rounded-24 bg-white shadow-[0_0_20px_rgba(38,37,40,0.2)]"
          ref={ref}
        >
          {header}
          <section className="px-15">{content}</section>
          {footer}
        </article>
      </div>
    </ModalContext.Provider>
  );
};

const ModalHeader = () => {
  const { onClose } = useContext(ModalContext);
  return (
    <header className="relative flex h-72 items-center justify-between px-24">
      <Icon name="logo" />
      <button
        className="h-40 w-40 translate-x-8 rounded-full transition-colors duration-200 ease-in-out hover:bg-gray-100 active:bg-gray-100"
        onClick={onClose}
      >
        <Icon className="m-auto" height={24} name="cancel" strokeWidth={1.8} width={24} />
      </button>
    </header>
  );
};
const ModalHeaderType = (<ModalHeader />).type;

const ModalFooter = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return <footer className={`overflow-hidden rounded-b-24 ${className}`}>{children}</footer>;
};
const ModalFooterType = (<ModalFooter />).type;

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
