import type { PropsWithChildren, ReactNode } from "react";
import { css } from "twin.macro";

import { DrawerContextProvider, useDrawerContext, useSetDrawerContext } from "./context";

export const Drawer = ({ children }: PropsWithChildren) => {
  return (
    <DrawerContextProvider>
      <aside>{children}</aside>
    </DrawerContextProvider>
  );
};

interface DrawerTriggerProps {
  children: ({ isOpen }: { isOpen: boolean }) => ReactNode;
}
const DrawerTrigger = ({ children }: DrawerTriggerProps) => {
  const isOpen = useDrawerContext();
  const setIsOpen = useSetDrawerContext();

  return <button onClick={() => setIsOpen((prev) => !prev)}>{children({ isOpen })}</button>;
};

interface DrawerContentProps {
  className: string;
  children: ReactNode;
  direction: "left" | "right";
}
const DrawerContent = ({ children, className, direction }: DrawerContentProps) => {
  const isOpen = useDrawerContext();

  return (
    <section
      className={className}
      css={[
        css`
          visibility: hidden;
          transform: translateX(${direction === "left" ? "-110%" : "110%"});
          will-change: transform;
          transition: transform 0.4s ease, visibility 0s ease 0.4s;
          position: absolute;
          inset: 0;
          height: calc(100vh - 5rem);
          background: white;
        `,
        isOpen &&
          css`
            visibility: visible;
            transform: translateX(0);
            transition: transform 0.4s ease;
          `,
      ]}
    >
      {children}
    </section>
  );
};

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
