import { useCallback } from "react";

import { useSetToastContext } from "@/components/common/Toast/context";
import type { Toast, ToastType } from "@/components/common/Toast/types";

const toastFactory = (
  (id) =>
  (type: ToastType, message: Toast["message"]): Toast => ({
    type,
    message,
    id: id++,
  })
)(1);

const delay = (duration: number) => new Promise((r) => setTimeout(r, duration));

export const useToast = () => {
  const dispatch = useSetToastContext();

  const remove = useCallback(
    (id: number) => {
      dispatch({ type: "remove", id });
    },
    [dispatch],
  );

  const success = useCallback(
    (message: Toast["message"], option?: { icon?: string; duration?: number }) => {
      const toast = toastFactory("success", message);
      dispatch({ type: "add", toast });

      return delay(1000).then(() => remove(toast.id));
    },
    [dispatch, remove],
  );

  return { success };
};
