import type { RefObject } from "react";
import { createContext, useContext } from "react";

export const GlobalScrollContext = createContext<RefObject<HTMLElement>>(
  null as unknown as RefObject<HTMLElement>,
);
export const useGlobalScrollContext = () => useContext(GlobalScrollContext);
