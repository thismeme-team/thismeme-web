import { Icon } from "@/components/common/Icon";
import type { Toast as Props } from "@/components/common/Toast/types";
import { toastColor } from "@/components/common/Toast/types";

export const Toast = ({ message, className = "", icon, id, color = "black" }: Props) => {
  return (
    <output
      className={`flex min-h-38 min-w-197 items-center justify-center gap-4 rounded-5 px-10 text-15-semibold-130 backdrop-blur-[2px] ${toastColor[color]} ${className}`}
    >
      {typeof icon === "string" ? <Icon color="white" height={24} name={icon} width={24} /> : icon}
      {typeof message === "function" ? message(id) : message}
    </output>
  );
};
