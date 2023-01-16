import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

const DrawerContext = createContext(false);
const DrawerSetContext = createContext<Dispatch<SetStateAction<boolean>>>(() => null);

export const DrawerContextProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DrawerContext.Provider value={isOpen}>
      <DrawerSetContext.Provider value={setIsOpen}>{children}</DrawerSetContext.Provider>
    </DrawerContext.Provider>
  );
};

export const useDrawerContext = () => useContext(DrawerContext);
export const useSetDrawerContext = () => useContext(DrawerSetContext);
