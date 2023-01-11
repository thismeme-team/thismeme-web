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
      <nav>{children}</nav>
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

const DrawerContent = ({ children }: PropsWithChildren) => {
  const isOpen = useDrawerContext();

  // TODO transform : translateX 이용한 애니메이션
  // DOM 노드 사라지지 않게
  return <aside className={`fixed left-0 ${isOpen ? "visible" : "invisible"}`}>{children}</aside>;
};

Drawer.Trigger = DrawerTrigger;
Drawer.Content = DrawerContent;
