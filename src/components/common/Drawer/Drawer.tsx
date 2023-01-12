import { css } from "@emotion/react";
import type { PropsWithChildren, ReactElement } from "react";
import { cloneElement } from "react";

import {
  DrawerContextProvider,
  useDrawerContext,
  useSetDrawerContext,
} from "@/components/common/Drawer/context";

/**
 * @example
 * <Drawer>
 *   <Drawer.Trigger open={<Icon/>} close={<Icon/>}/>
 *   <Drawer.Content>
 *     <SideBar />
 *   </Drawer.Content>
 * </Drawer>
 */

export const Drawer = ({ children }: PropsWithChildren) => {
  return (
    <DrawerContextProvider>
      <aside>{children}</aside>
    </DrawerContextProvider>
  );
};

interface DrawerTriggerProps {
  open: ReactElement;
  close: ReactElement;
}
const DrawerTrigger = ({ open, close }: DrawerTriggerProps) => {
  const isOpen = useDrawerContext();
  const setIsOpen = useSetDrawerContext();

  const className = "cursor-pointer";

  return isOpen
    ? cloneElement(close, { onClick: () => setIsOpen(false), className })
    : cloneElement(open, { onClick: () => setIsOpen(true), className });
};

const DrawerContent = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  const isOpen = useDrawerContext();

  return (
    <section
      className={className}
      css={[
        css`
          visibility: hidden;
          transform: translateX(-110%);
          will-change: transform;
          transition: transform 0.4s ease, visibility 0s ease 0.4s;
          position: absolute;
          inset: 0;
          height: 100vh;
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
