import type { PropsWithChildren } from "react";
import { Children, isValidElement } from "react";
import { CSSTransition } from "react-transition-group";
import tw, { css } from "twin.macro";

import { useClickOutside } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}
const DELAY = 300;

export const Dialog = ({ children, isOpen, onClose }: PropsWithChildren<DialogProps>) => {
  const ref = useClickOutside({ onClose });

  const reactChildren = Children.toArray(children);

  const DialogHeaderType = (<DialogHeader onClose={onClose} />).type;
  const DialogFooterType = (<DialogFooter />).type;

  const header = reactChildren.filter(
    (child) => isValidElement(child) && child.type === DialogHeaderType,
  );
  const footer = reactChildren.filter(
    (child) => isValidElement(child) && child.type === DialogFooterType,
  );

  const content = reactChildren.filter(
    (child) => isValidElement(child) && ![DialogFooterType, DialogHeaderType].includes(child.type),
  );

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={isOpen}
      timeout={{
        appear: DELAY,
        exit: DELAY,
      }}
    >
      <div
        css={[
          tw`fixed inset-0 z-[1300] flex touch-none items-end justify-center bg-black/50`,
          css`
            &.enter-done {
              opacity: 1;
            }
            opacity: 0;
            transition: opacity ${DELAY}ms;
          `,
        ]}
      >
        <article
          className="relative m-auto rounded-24 bg-white text-16-semibold-140 shadow-[0_0_20px_rgba(38,37,40,0.2)]"
          ref={ref}
        >
          {header}
          <section className="px-15">{content}</section>
          {footer}
        </article>
      </div>
    </CSSTransition>
  );
};

interface DialogHeaderProps {
  onClose: () => void;
}
const DialogHeader = ({ onClose }: DialogHeaderProps) => {
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

const DialogFooter = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return <footer className={`overflow-hidden rounded-b-24 ${className}`}>{children}</footer>;
};

Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
