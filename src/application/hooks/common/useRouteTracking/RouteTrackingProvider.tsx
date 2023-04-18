import { useRouter } from "next/router";
import type { PropsWithChildren } from "react";
import { createContext, useEffect } from "react";

import { useIsMount, useSessionStorage } from "@/application/hooks";

const pathsDefaultValue: string[] = [];

export const RouteTrackingContext = createContext(pathsDefaultValue);
export const RouteTrackingProvider = ({ children }: PropsWithChildren) => {
  const isMount = useIsMount();
  const router = useRouter();
  const [state, set, get] = useSessionStorage<string[]>("paths", {
    defaultValue: pathsDefaultValue,
  });

  useEffect(() => {
    if (!isMount) return;

    const prevPaths = get();
    const isBack = prevPaths.at(-2) === router.asPath;
    const isRefresh = prevPaths.at(-1) === router.asPath;

    if (isRefresh) return;
    if (isBack) return set((prev) => prev.slice(0, -1));
    return set((prev) => [...prev, router.asPath]);
  }, [get, isMount, router.asPath, set]);

  return <RouteTrackingContext.Provider value={state}>{children}</RouteTrackingContext.Provider>;
};
