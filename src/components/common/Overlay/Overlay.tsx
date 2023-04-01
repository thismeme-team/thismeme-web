import type { ReactNode } from "react";
import type { TransitionStatus } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import { css } from "twin.macro";

import { Portal } from "@/components/common/Portal";

const DELAY = 300;

interface Props {
  onBackdropClick: () => void;
  isOpen: boolean;
  children: ReactNode | ((state: TransitionStatus) => ReactNode);
}

export const Overlay = ({ children, isOpen, onBackdropClick }: Props) => {
  return (
    <Portal id="overlay-portal">
      <CSSTransition mountOnEnter unmountOnExit in={isOpen} timeout={DELAY}>
        <div
          css={[
            css`
              &.enter-done {
                opacity: 1;
              }
              position: fixed;
              inset: 0;
              opacity: 0;
              z-index: 1000;
              display: flex;
              align-items: flex-end;
              justify-content: center;
              background: rgb(0, 0, 0, 0.5);

              transition: opacity ${DELAY}ms;
            `,
          ]}
          onPointerDown={onBackdropClick}
        />
      </CSSTransition>
      <CSSTransition mountOnEnter unmountOnExit in={isOpen} timeout={DELAY}>
        {children}
      </CSSTransition>
    </Portal>
  );
};
