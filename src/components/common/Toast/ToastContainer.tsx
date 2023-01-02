import { useLayoutEffect, useRef } from "react";

import { Portal } from "@/components/common/Portal";
import { useToastContext } from "@/components/common/Toast/context";
import { Toast } from "@/components/common/Toast/Toast";

let prevHeight = 0;
const EXPAND_DELAY = 230;

export const ToastContainer = () => {
  const toasts = useToastContext();

  const ref = useRef<HTMLElement>(null);

  /**
   * NOTE FLIP Animation
   *  @link https://web.dev/building-a-toast-component/#managing-one-or-many-toasts
   */
  useLayoutEffect(() => {
    if (ref.current) {
      const currentHeight = ref.current.getBoundingClientRect().height;

      if (currentHeight > prevHeight) {
        const invert = currentHeight - prevHeight;

        ref.current.animate(
          [{ transform: `translateY(${invert}px)` }, { transform: "translateY(0)" }],
          {
            duration: EXPAND_DELAY,
            easing: "ease-out",
          },
        );
      }
      prevHeight = currentHeight;
    }
  }, [toasts]);

  return (
    <Portal id="toast-portal">
      <aside
        className="pointer-events-none fixed inset-x-18 bottom-18 z-10 grid place-items-center content-end gap-6"
        ref={ref}
      >
        {toasts.map((t) => (
          <Toast key={t.id} {...t} />
        ))}
      </aside>
    </Portal>
  );
};
