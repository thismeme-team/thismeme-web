import { Icon } from "@/components/common/Icon";

import type { Toast as Props } from "./types";
import { toastColor, toastIconColor } from "./types";

export const Toast = ({ message, className = "", icon, id, color = "black", visible }: Props) => {
  return (
    <output
      className={`flex h-48 w-full items-center gap-4 rounded-10 px-16 font-suit text-16-semibold-140 will-change-transform ${
        visible ? "animate-enter" : "animate-exit"
      } ${toastColor[color]} ${className}`}
    >
      {typeof icon === "string" ? (
        <Icon color={toastIconColor[color]} height={24} name={icon} width={24} />
      ) : (
        icon
      )}
      {typeof message === "function" ? message(id) : message}
    </output>
  );
};
