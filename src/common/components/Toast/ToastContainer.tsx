import { useRef } from "react";

import { useIsomorphicLayoutEffect } from "@/common/hooks";

import { Portal } from "../Portal";
import { useToastContext } from "./context";
import { Toast } from "./Toast";

let prevHeight = 0;
const EXPAND_DELAY = 200;

export const ToastContainer = () => {
  const toasts = useToastContext();

  const ref = useRef<HTMLElement>(null);

  /**
   * NOTE FLIP Animation
   *  @link https://web.dev/building-a-toast-component/#managing-one-or-many-toasts
   */
  useIsomorphicLayoutEffect(() => {
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

  // TODO z-index 관리
  return (
    <Portal id="toast-portal">
      <aside
        className="fixed inset-x-0 bottom-32 z-[1300] m-auto grid w-full max-w-[44rem] place-items-center content-end gap-6 px-18"
        ref={ref}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </aside>
    </Portal>
  );
};
