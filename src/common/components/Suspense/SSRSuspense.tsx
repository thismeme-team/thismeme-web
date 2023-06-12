import type { ComponentProps } from "react";
import { Suspense } from "react";

import { useIsMount } from "@/application/hooks";

type Props = ComponentProps<typeof Suspense>;

export const SSRSuspense = (props: Props) => {
  const isMounted = useIsMount();

  return isMounted ? <Suspense {...props} /> : <>{props.fallback}</>;
};
