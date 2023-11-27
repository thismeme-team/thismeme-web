import { useRouter } from "next/router";
import type { ComponentProps } from "react";

import { useRouteTracking } from "@/common/hooks";

import { Icon } from "../../Icon";

export const BackButton = (props: ComponentProps<"button">) => {
  const router = useRouter();

  const { isInitialPage } = useRouteTracking();
  if (isInitialPage) return null;

  return (
    <button {...props} type="button" onClick={() => router.back()}>
      <Icon name="back" />
    </button>
  );
};
