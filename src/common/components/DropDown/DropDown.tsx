import type { CSSInterpolation } from "@emotion/serialize";
import type {
  Dispatch,
  LiHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from "react";
import { createContext, useContext, useState } from "react";
import { css } from "twin.macro";

import { useClickOutside } from "@/application/hooks";
import { withDelay } from "@/application/util/delay";

const DropDownContext = createContext(false);
const DropDownSetContext = createContext<Dispatch<SetStateAction<boolean>>>(() => null);

export const DropDown = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>({ onClose: () => setIsOpen(false) });

  return (
    <DropDownContext.Provider value={isOpen}>
      <DropDownSetContext.Provider value={setIsOpen}>
        <div css={{ fontSize: 0 }} ref={ref}>
          {children}
        </div>
      </DropDownSetContext.Provider>
    </DropDownContext.Provider>
  );
};

interface TriggerProps {
  children: (({ isOpen }: { isOpen: boolean }) => ReactNode) | ReactNode;
}

const DropDownTrigger = ({ children }: TriggerProps) => {
  const isOpen = useContext(DropDownContext);
  const setIsOpen = useContext(DropDownSetContext);

  return (
    <button onClick={() => setIsOpen((prev) => !prev)}>
      {typeof children === "function" ? children({ isOpen }) : children}
    </button>
  );
};

/**
 * @desc
 *  외부에서 스타일(css props)을 지정해 주기 위해
 *  className(...rest)을 추가로 설정해 주어야 함
 */
const DropDownContents = ({
  children,
  width,
  ...rest
}: PropsWithChildren<{ width?: string; css?: CSSInterpolation }>) => {
  const isOpen = useContext(DropDownContext);
  return (
    <ul
      css={[
        css`
          position: absolute;
          z-index: 10;
          width: ${width}rem;
          border-radius: 10px;
          background: white;
          overflow: hidden;
          transition: transform 0.4s ease, opacity 0.2s ease-in-out;
          box-shadow: 0px 0px 20px rgba(38, 47, 40, 0.2);
          ${!isOpen && "pointer-events: none;"}
        `,
        width &&
          css`
            width: ${width}rem;
          `,
        { opacity: isOpen ? 1 : 0 },
      ]}
      {...rest}
    >
      {children}
    </ul>
  );
};

const DropDownContent = ({
  children,
  ...rest
}: PropsWithChildren<LiHTMLAttributes<HTMLLIElement>>) => {
  const setIsOpen = useContext(DropDownSetContext);

  const delayClose = withDelay(() => setIsOpen(false), 200);
  return (
    <li onPointerDown={delayClose} {...rest}>
      {children}
    </li>
  );
};

DropDown.Content = DropDownContent;
DropDown.Contents = DropDownContents;
DropDown.Trigger = DropDownTrigger;
