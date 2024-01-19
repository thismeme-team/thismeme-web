import { useRouter } from "next/router";
import { useEffect } from "react";

import * as gtag from "@/common/utils";

export const useAnalytics = () => {
  const router = useRouter();
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};
