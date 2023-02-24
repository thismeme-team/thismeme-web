import type { ComponentProps, PropsWithChildren } from "react";
import { css } from "twin.macro";

import { android } from "@/application/util";

const DELAY = 500;

export const ActionSheet = ({ children, isOpen }: PropsWithChildren<{ isOpen?: boolean }>) => {
  return (
    <div
      css={[
        css`
          position: fixed;

          z-index: 1000;

          inset: auto 0 0 0;
          display: flex;
          justify-content: center;

          transform: translateY(105%);
          transition: transform ${DELAY}ms cubic-bezier(0, 0.8, 0.34, 1);
        `,
        !android &&
          css`
            padding-bottom: calc(env(safe-area-inset-bottom) + 4rem);
          `,
        isOpen &&
          css`
            transform: translateY(0);
          `,
      ]}
    >
      <div
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
                border-radius: 0 0 1.3rem 1.3rem;
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
  );
};

type ActionSheetButtonProps = ComponentProps<"button">;
const ActionSheetButton = ({
  children,
  className,
  ...rest
}: PropsWithChildren<ActionSheetButtonProps>) => {
  return (
    <button className={`flex h-62 items-center ${className}`} {...rest}>
      {children}
    </button>
  );
};

ActionSheet.Button = ActionSheetButton;
