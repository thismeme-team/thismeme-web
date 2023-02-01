import type { PropsWithChildren } from "react";
import { css } from "twin.macro";

interface Props {
  left?: string;
  top?: string;
}

export const DropDownBase = ({ children, left, top }: PropsWithChildren<Props>) => {
  return (
    <div
      css={[
        css`
          position: absolute;
          z-index: 900;
          left: ${left}rem;
          top: ${top}rem;
          display: block;
        `,
      ]}
    >
      {children}
    </div>
  );
};
