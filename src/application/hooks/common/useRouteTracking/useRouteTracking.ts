import { useContext, useMemo } from "react";

import { RouteTrackingContext } from "./RouteTrackingProvider";

export const useRouteTracking = () => {
  const history = useContext(RouteTrackingContext);

  return useMemo(
    () => ({
      isInitialPage: history.length <= 1,
      history,
    }),
    [history],
  );
};
