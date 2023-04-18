import { useRouter } from "next/router";
import { useEffect } from "react";

import { useIsMount, useSessionStorage } from "@/application/hooks";

const pathsDefaultValue: string[] = [];

export const useRouteTracking = () => {
  const isMount = useIsMount();
  const router = useRouter();
  const [, set, get] = useSessionStorage<string[]>("paths", { defaultValue: pathsDefaultValue });

  useEffect(() => {
    if (!isMount) return;

    const prevPaths = get();
    const isBack = prevPaths.at(-2) === router.asPath;
    const isRefresh = prevPaths.at(-1) === router.asPath;

    if (isRefresh) return;
    if (isBack) return set((prev) => prev.slice(0, -1));
    return set((prev) => [...prev, router.asPath]);
  }, [get, isMount, router.asPath, set]);
};
