import type { CSSInterpolation } from "@emotion/serialize";
import type { ReactElement } from "react";

import type { IconName } from "../Icon";
import type { toastColors } from "./style";

export type ToastType = "success" | "custom";

export interface Toast {
  type: ToastType;
  id: number;
  message: ReactElement | string | ((id: number) => ReactElement | string);
  visible: boolean;
  color?: keyof typeof toastColors;
  icon?: ReactElement | IconName;
  duration?: number;
  className?: string;
  css?: CSSInterpolation;
}

export type ToastOption = Omit<Toast, "type" | "id" | "message" | "visible">;
