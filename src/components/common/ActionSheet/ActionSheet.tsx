import type { ComponentProps, PropsWithChildren } from "react";
import { CSSTransition } from "react-transition-group";
import tw, { css } from "twin.macro";

const DELAY = 300;

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ActionSheet = ({ children, isOpen, onClose }: PropsWithChildren<ActionSheetProps>) => {
  return (
    <>
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
            css`
              &.enter-done {
                opacity: 1;
              }
              opacity: 0;
              transition: opacity ${DELAY}ms;

              position: fixed;
              inset: 0;
              z-index: 1000;
              display: flex;
              align-items: flex-end;
              justify-content: center;
              background: rgb(0, 0, 0, 0.5);
            `,
          ]}
          onPointerDown={onClose}
        />
      </CSSTransition>
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
            tw`text-16-semibold-140`,
            css`
              &.enter-done {
                transform: translateY(0);
              }
              transform: translateY(105%);
              transition: transform ${DELAY}ms cubic-bezier(0, 0.8, 0.34, 1);

              position: fixed;
              z-index: 1000;
              inset: auto 0 0 0;
              display: flex;
              justify-content: center;
              padding-bottom: calc(env(safe-area-inset-bottom) + 4rem);
            `,
          ]}
        >
          <div
            css={[
              tw`divide-solid divide-gray-200 divide-y`,
              css`
                background: white;
                border-radius: 1rem;
                width: calc(min(100vw, 48rem) - 3.6rem);
              `,
            ]}
          >
            {children}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

type ActionSheetButtonProps = ComponentProps<"button">;
const ActionSheetButton = ({
  children,
  className = "",
  ...rest
}: PropsWithChildren<ActionSheetButtonProps>) => {
  return (
    <button
      className={`h-63 w-full first:rounded-t-10 last:rounded-b-10 hover:bg-gray-100 active:bg-gray-100 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

ActionSheet.Button = ActionSheetButton;
