import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

export interface NavigationState {
  isMenuOpen: boolean;
}

interface NavigationContextType {
  context: NavigationState;
  setContext: Dispatch<SetStateAction<NavigationState>>;
}

const NavigationContext = createContext<NavigationContextType>(
  null as unknown as NavigationContextType,
);

export const useTopNavigationContext = () => useContext(NavigationContext);

export const NavigationContextProvider = ({ children }: PropsWithChildren) => {
  const [context, setContext] = useState({ isMenuOpen: false });
  return (
    <NavigationContext.Provider value={{ context, setContext }}>
      {children}
    </NavigationContext.Provider>
  );
};
