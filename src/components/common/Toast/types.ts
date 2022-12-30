import type { ReactNode } from "react";

import type { IconName } from "@/components/common/Icon";

export type ToastType = "success" | "custom";

export interface Toast {
  type: ToastType;
  id: number;
  message: ReactNode | string;
  icon?: ReactNode | IconName;
  duration?: number;
  className?: string;
}
