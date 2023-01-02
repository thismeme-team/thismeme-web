import { useCallback } from "react";

import { delay } from "@/application/util";
import { useSetToastContext } from "@/components/common/Toast/context";
import type { Toast, ToastOption, ToastType } from "@/components/common/Toast/types";

const DEFAULT_TOAST_DELAY = 1000;

const toastFactory = (type: ToastType, message: Toast["message"], option?: ToastOption): Toast => ({
  type,
  message,
  ...option,
  id: Date.now(),
});

export const useToast = () => {
  const dispatch = useSetToastContext();

  const remove = useCallback(
    (id: number) => {
      dispatch({ type: "remove", id });
    },
    [dispatch],
  );

  const success = useCallback(
    (message: Toast["message"], option?: ToastOption) => {
      const toast = toastFactory("success", message, option);
      dispatch({ type: "add", toast });

      return delay(DEFAULT_TOAST_DELAY || 1000).then(() => remove(toast.id));
    },
    [dispatch, remove],
  );

  return { success };
};
