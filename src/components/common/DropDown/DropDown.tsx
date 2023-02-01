import type { PropsWithChildren, ReactNode } from "react";

import { withDelay } from "@/application/util/delay";

import { DrawerContextProvider, useDrawerContext, useSetDrawerContext } from "../Drawer";

interface TriggerProps {
  children: ({ isOpen }: { isOpen: boolean }) => ReactNode;
}

const DropDownTrigger = ({ children }: TriggerProps) => {
  const isOpen = useDrawerContext();
  const setIsOpen = useSetDrawerContext();

  return <button onClick={() => setIsOpen((prev) => !prev)}>{children({ isOpen })}</button>;
};

const DropDownContainer = ({ children }: PropsWithChildren) => {
  const isOpen = useDrawerContext();
  return <>{isOpen && children}</>;
};

const DropDownContent = ({ children, ...rest }: PropsWithChildren) => {
  const setIsOpen = useSetDrawerContext();
  const delayClose = withDelay(() => setIsOpen(false), 650);
  return (
    <div
      {...rest}
      onPointerDown={() => {
        delayClose();
      }}
    >
      {children}
    </div>
  );
};

export const DropDown = ({ children }: PropsWithChildren) => {
  return (
    <DrawerContextProvider>
      <aside>{children}</aside>
    </DrawerContextProvider>
  );
};

DropDown.Content = DropDownContent;
DropDown.Container = DropDownContainer;
DropDown.Trigger = DropDownTrigger;
