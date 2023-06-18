import { useRouter } from "next/router";
import type { PropsWithChildren } from "react";
import { createContext, useEffect } from "react";

import { useIsMount } from "../useIsMount";
import { useSessionStorage } from "../useSessionStorage";

const defaultValue: string[] = [];

export const RouteTrackingContext = createContext(defaultValue);
export const RouteTrackingProvider = ({ children }: PropsWithChildren) => {
  const isMount = useIsMount();
  const router = useRouter();
  const [paths, set] = useSessionStorage<string[]>("paths", {
    defaultValue,
  });

  useEffect(() => {
    if (!isMount) return;

    const isBack = paths.at(-2) === router.asPath;
    const isRefresh = paths.at(-1) === router.asPath;

    if (isRefresh) return;
    if (isBack) return set((prev) => prev.slice(0, -1));
    return set((prev) => [...prev, router.asPath]);
  }, [isMount, paths, router.asPath, set]);

  return <RouteTrackingContext.Provider value={paths}>{children}</RouteTrackingContext.Provider>;
};
