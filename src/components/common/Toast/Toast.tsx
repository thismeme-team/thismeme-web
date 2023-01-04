import { Icon } from "@/components/common/Icon";
import type { Toast as Props } from "@/components/common/Toast/types";
import { toastColor, toastIconColor } from "@/components/common/Toast/types";

export const Toast = ({ message, className = "", icon, id, color = "black", visible }: Props) => {
  return (
    // NOTE text를 완전히 center에 두기 위해 line-height를 0으로 주었음
    <output
      className={`flex min-h-38 min-w-197 ${
        visible ? "animate-enter" : "animate-exit"
      } items-center justify-center gap-4 rounded-5 px-10 py-7 text-15-semibold-130 leading-none backdrop-blur-[2px] will-change-transform ${
        toastColor[color]
      } ${className}`}
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
