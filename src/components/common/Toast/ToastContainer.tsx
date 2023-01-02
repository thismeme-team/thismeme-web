import { useRef } from "react";

import { Portal } from "@/components/common/Portal";
import { useToastContext } from "@/components/common/Toast/context";
import { Toast } from "@/components/common/Toast/Toast";

export const ToastContainer = () => {
  const toasts = useToastContext();

  const ref = useRef<HTMLElement>(null);

  /**
   * TODO FLIP Container Animation
   */

  return (
    <Portal id="toast-portal">
      <aside
        className="pointer-events-none fixed inset-18 z-10 grid place-content-center place-items-center gap-6"
        ref={ref}
      >
        {toasts.map((t) => (
          <Toast key={t.id} {...t} />
        ))}
      </aside>
    </Portal>
  );
};
