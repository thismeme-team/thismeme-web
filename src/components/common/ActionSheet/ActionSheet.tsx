import type { CSSInterpolation } from "@emotion/serialize";
import type { ComponentProps, PropsWithChildren } from "react";
import { useRef } from "react";
import { Transition } from "react-transition-group";
import tw, { css } from "twin.macro";

import { useModal } from "@/application/hooks";
import { android } from "@/application/util";
import { Portal } from "@/components/common/Portal";

interface Props {
  onBackdropClick: () => void;
}

const transitionStyles = {
  dim: {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  } as { [k: string]: CSSInterpolation },
  sheet: {
    entering: { transform: "translateY(0%)" },
    entered: { transform: "translateY(0%)" },
    exiting: { transform: "translateY(105%)" },
    exited: { transform: "translateY(105%)" },
  } as { [k: string]: CSSInterpolation },
};
const DELAY = 500;

export const ActionSheet = ({ children, onBackdropClick }: PropsWithChildren<Props>) => {
  const { open, onOpen, onClose } = useModal();

  const dimRef = useRef(null);
  const sheetRef = useRef(null);
  return (
    <Portal id="long-press-portal">
      <button className="fixed z-[2000] h-100 w-100 bg-red-200" onClick={onOpen}>
        onOpen
      </button>
      <button className="fixed left-200 z-[2000] h-100 w-100 bg-red-200" onClick={onClose}>
        onCloses
      </button>
      <Transition unmountOnExit in={open} nodeRef={dimRef} timeout={DELAY}>
        {(status) => (
          <div
            ref={dimRef}
            css={[
              css`
                position: fixed;
                inset: 0;
                z-index: 1000;
                display: flex;
                align-items: flex-end;
                justify-content: center;
                background: rgb(0, 0, 0, 0.5);

                transition: opacity ${DELAY}ms;
              `,
              transitionStyles.dim[status],
            ]}
            onPointerUp={onClose}
          />
        )}
      </Transition>
      <Transition unmountOnExit in={open} nodeRef={sheetRef} timeout={DELAY}>
        {(status) => (
          <div
            css={[
              css`
                position: fixed;

                z-index: 1000;
                transform: translateY(105%);
                transition: transform ${DELAY}ms cubic-bezier(0, 0.8, 0.34, 1);

                inset: auto 0 0 0;
                display: flex;
                justify-content: center;
              `,
              !android &&
                css`
                  padding-bottom: calc(env(safe-area-inset-bottom) + 4rem);
                `,
              transitionStyles.sheet[status],
            ]}
          >
            <div
              ref={sheetRef}
              css={[
                css`
                  @media (prefers-color-scheme: dark) {
                    background: #2b2e38;
                  }
                `,
                android
                  ? css`
                      background: #e2e9f8;

                      padding-inline: 1.8rem;
                      border-radius: 0 0 1rem 1rem;
                      font-size: 1.65rem;
                      width: min(100vw, 48rem);
                      color: #1b1b1f;

                      @media (prefers-color-scheme: dark) {
                        color: #e3e2e6;
                      }
                    `
                  : css`
                      background: white;

                      border-radius: 1rem;
                      font-size: 2rem;
                      padding-inline: 1.6rem;
                      width: calc(min(100vw, 48rem) - 3.6rem);
                      color: #007aff;
                    `,
              ]}
            >
              {children}
            </div>
          </div>
        )}
      </Transition>
    </Portal>
  );
};

type ActionSheetButtonProps = ComponentProps<"button">;
const ActionSheetButton = ({ children, ...rest }: PropsWithChildren<ActionSheetButtonProps>) => {
  return (
    <button css={tw`flex h-62 items-center`} {...rest}>
      {children}
    </button>
  );
};

ActionSheet.Button = ActionSheetButton;
