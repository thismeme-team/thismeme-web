import type { PropsWithChildren, ReactElement } from "react";
import { Children, cloneElement, createContext, isValidElement, useContext } from "react";

import { useClickOutside, useModal } from "@/application/hooks";
import { fadeInOut } from "@/application/util/animation";
import { Icon } from "@/components/common/Icon";
import { Portal } from "@/components/common/Portal";

type ModalContextValue = ReturnType<typeof useModal>;
const ModalContext = createContext<ModalContextValue>(null as unknown as ModalContextValue);

export const Modal = ({ children }: PropsWithChildren) => {
  const { open, onOpen, onClose } = useModal();
  const ref = useClickOutside({ onClose });

  const modalChildren = Children.toArray(children);

  const trigger = modalChildren.find(
    (child) => isValidElement(child) && child.type === ModalTriggerType,
  );
  const contents = modalChildren.filter(
    (child) => isValidElement(child) && child.type !== ModalTriggerType,
  );

  return (
    <ModalContext.Provider value={{ open, onOpen, onClose }}>
      {trigger}
      <Portal id="modal-portal">
        <div
          className="absolute inset-0 z-[1300] flex items-center bg-black/50 touch-none"
          css={fadeInOut(open)}
          onTouchEnd={(event) => {
            if (event.target === event.currentTarget) event.preventDefault();
          }}
        >
          <article className="m-auto rounded-10 border border-gray-400 bg-white px-16" ref={ref}>
            {contents}
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

interface ModalContentProps {
  children: (args: ModalContextValue) => ReactElement;
}
const ModalContent = ({ children }: ModalContentProps) => {
  const context = useContext(ModalContext);
  return children(context);
};

interface ModalTriggerProps {
  children: ReactElement | ((args: ModalContextValue) => ReactElement);
}
const ModalTrigger = ({ children }: ModalTriggerProps) => {
  const context = useContext(ModalContext);
  const { open, onOpen, onClose } = context;
  return typeof children === "function"
    ? children(context)
    : cloneElement(children, { onClick: () => (open ? onClose() : onOpen()) });
};

// @ts-expect-error : 컴포넌트의 type 만 얻기 위해 props type check off
const ModalTriggerType = (<ModalTrigger />).type;

Modal.Trigger = ModalTrigger;
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
