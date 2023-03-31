import type { ComponentProps, PropsWithChildren } from "react";
import tw, { css } from "twin.macro";

const DELAY = 300;

export const ActionSheet = ({ children, isOpen }: PropsWithChildren<{ isOpen?: boolean }>) => {
  return (
    <div
      css={[
        tw`text-16-semibold-140`,
        css`
          position: fixed;

          z-index: 1000;

          inset: auto 0 0 0;
          display: flex;
          justify-content: center;

          transform: translateY(105%);
          transition: transform ${DELAY}ms cubic-bezier(0, 0.8, 0.34, 1);
        `,
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
