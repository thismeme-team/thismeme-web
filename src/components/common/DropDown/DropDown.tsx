import type { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { css, theme } from "twin.macro";

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
        <div ref={ref}>{children}</div>
      </DropDownSetContext.Provider>
    </DropDownContext.Provider>
  );
};

interface TriggerProps {
  children: ({ isOpen }: { isOpen: boolean }) => ReactNode;
}

const DropDownTrigger = ({ children }: TriggerProps) => {
  const isOpen = useContext(DropDownContext);
  const setIsOpen = useContext(DropDownSetContext);

  return <button onClick={() => setIsOpen((prev) => !prev)}>{children({ isOpen })}</button>;
};

const DropDownContents = ({ children, width }: PropsWithChildren<{ width: string }>) => {
  const isOpen = useContext(DropDownContext);

  return (
    <>
      {isOpen && (
        <ul
          css={[
            css`
              position: absolute;
              z-index: 10;
              width: ${width}rem;
              border-radius: 10px;
              border: solid 1px ${theme`colors.gray.400`};
              background: white;
              overflow: hidden;
              transition: transform 0.4s ease, opacity 0.2s ease-in-out;
            `,
          ]}
        >
          {children}
        </ul>
      )}
    </>
  );
};

const DropDownContent = ({ children, ...rest }: PropsWithChildren) => {
  const setIsOpen = useContext(DropDownSetContext);

  const delayClose = withDelay(() => setIsOpen(false), 200);
  return (
    <div onPointerDown={delayClose} {...rest}>
      {children}
    </div>
  );
};

DropDown.Content = DropDownContent;
DropDown.Contents = DropDownContents;
DropDown.Trigger = DropDownTrigger;
