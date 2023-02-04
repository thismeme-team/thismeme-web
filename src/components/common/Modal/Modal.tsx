import type { PropsWithChildren, ReactElement } from "react";
import { Children, cloneElement, createContext, isValidElement, useContext } from "react";

import { useClickOutside, useModal } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";
import { Portal } from "@/components/common/Portal";

type ModalContextValue = ReturnType<typeof useModal>;
const ModalContext = createContext<ModalContextValue>(null as unknown as ModalContextValue);

export const Modal = ({ children }: PropsWithChildren) => {
  const { open, onOpen, onClose } = useModal();
  const ref = useClickOutside({ onClose });

  const trigger = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === ModalTriggerType,
  );
  const contents = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type !== ModalTriggerType,
  );

  return (
    <ModalContext.Provider value={{ open, onOpen, onClose }}>
      {trigger}
      {open && (
        <Portal id="modal-portal">
          <div className="absolute z-[1300] flex h-full w-full items-center overflow-auto bg-[#00000099]">
            <article className="m-auto rounded-10 border border-gray-400 bg-white px-16" ref={ref}>
              {contents}
            </article>
          </div>
        </Portal>
      )}
    </ModalContext.Provider>
  );
};

const ModalHeader = () => {
  const { onClose } = useContext(ModalContext);
  return (
    <header className="relative flex h-72 items-center justify-between px-8">
      <Icon name="modalLogo" />
      <button onClick={onClose}>
        <Icon name="cancel" />
      </button>
    </header>
  );
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

// eslint-disable-next-line react/no-children-prop
const ModalTriggerType = (<ModalTrigger children={<div />} />).type;

Modal.Trigger = ModalTrigger;
Modal.Header = ModalHeader;
