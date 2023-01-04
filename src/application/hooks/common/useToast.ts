import { useCallback } from "react";

import { delay } from "@/application/util";
import { useSetToastContext } from "@/components/common/Toast/context";
import type { Toast, ToastOption, ToastType } from "@/components/common/Toast/types";

const DEFAULT_TOAST_DELAY = 1000;
const ANIMATION_EXPIRE_DELAY = 1000;

const toastFactory = (type: ToastType, message: Toast["message"], option?: ToastOption): Toast => ({
  type,
  id: Date.now(),
  message,
  visible: true,
  ...option,
});

export const useToast = () => {
  const dispatch = useSetToastContext();
  const close = useCallback(
    async ({ id, duration }: Pick<Toast, "id" | "duration">) => {
      await delay(duration || DEFAULT_TOAST_DELAY);
      dispatch({ type: "dismiss", id });

      await delay(ANIMATION_EXPIRE_DELAY);
      dispatch({ type: "remove", id });
    },
    [dispatch],
  );

  const show = useCallback(
    (message: Toast["message"], option?: ToastOption) => {
      const toast = toastFactory("custom", message, option);
      dispatch({ type: "add", toast });

      return close({ id: toast.id, duration: option?.duration });
    },
    [close, dispatch],
  );

  return { show };
};
