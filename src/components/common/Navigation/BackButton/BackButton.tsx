import { useRouter } from "next/router";

import { useRouteTracking } from "@/application/hooks";
import { Icon } from "@/components/common/Icon";

export const BackButton = () => {
  const router = useRouter();

  const { isInitialPage } = useRouteTracking();
  if (isInitialPage) return null;

  return (
    <button onClick={() => router.back()}>
      <Icon name="back" />
    </button>
  );
};
