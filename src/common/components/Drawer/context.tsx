import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useState } from "react";

const DrawerContext = createContext(false);
const DrawerSetContext = createContext<(state: boolean) => void>(() => null);

interface DrawerContextProviderProps {
  isOpen?: boolean;
  onOpenChange?(open: boolean): void;
}
export const DrawerContextProvider = ({
  children,
  isOpen: isOpenProp,
  onOpenChange,
}: PropsWithChildren<DrawerContextProviderProps>) => {
  const [isOpen = false, setIsOpen] = useState(isOpenProp);
  const isControlled = isOpenProp !== undefined;
  const value = isControlled ? isOpenProp : isOpen;

  const handleDrawer: React.Dispatch<React.SetStateAction<boolean | undefined>> = useCallback(
    (nextValue) => {
      const value = typeof nextValue === "function" ? nextValue(isOpenProp) : nextValue;
      if (isControlled) {
        if (value !== isOpenProp) onOpenChange?.(value as boolean);
      } else {
        setIsOpen(nextValue);
      }
    },
    [isControlled, isOpenProp, onOpenChange],
  );

  return (
    <DrawerContext.Provider value={value}>
      <DrawerSetContext.Provider value={handleDrawer}>{children}</DrawerSetContext.Provider>
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => useContext(DrawerContext);
export const useSetDrawerContext = () => useContext(DrawerSetContext);
