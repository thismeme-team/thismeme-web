import { useCallback } from "react";

import { delay } from "@/application/util";

interface Props {
  event: any;
  time: number;
}
export const useDelay = ({ event, time }: Props) => {
  const delayEvent = useCallback(async () => {
    await delay(time);
    event();
  }, [event, time]);

  return delayEvent;
};
