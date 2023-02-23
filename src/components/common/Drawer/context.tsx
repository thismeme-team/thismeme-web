import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useState } from "react";

const DrawerContext = createContext(false);
const DrawerSetContext = createContext<(state: boolean) => void>(() => null);

export const DrawerContextProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawer = useCallback((state: boolean) => {
    if (state) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    setIsOpen(state);
  }, []);

  return (
    <DrawerContext.Provider value={isOpen}>
      <DrawerSetContext.Provider value={handleDrawer}>{children}</DrawerSetContext.Provider>
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => useContext(DrawerContext);
export const useSetDrawerContext = () => useContext(DrawerSetContext);
