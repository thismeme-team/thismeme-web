import type { PropsWithChildren } from "react";

import { NavigationContextProvider } from "@/application/context/Navigation";

const ContextProvider = ({ children }: PropsWithChildren) => {
  return <NavigationContextProvider>{children}</NavigationContextProvider>;
};

export default ContextProvider;
