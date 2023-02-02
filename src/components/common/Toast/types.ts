import type { ReactElement } from "react";

import type { IconName } from "@/components/common/Icon";

export type ToastType = "success" | "custom";

export const toastColor = {
  black: "bg-gray-800 text-white",
  white: "border-black border bg-white/70 text-black", // sample color
};
export const toastIconColor = {
  black: "white",
  white: "black",
} as const;

export interface Toast {
  type: ToastType;
  id: number;
  message: ReactElement | string | ((id: number) => ReactElement | string);
  visible: boolean;
  color?: keyof typeof toastColor;
  icon?: ReactElement | IconName;
  duration?: number;
  className?: string;
}

export type ToastOption = Omit<Toast, "type" | "id" | "message" | "visible">;
