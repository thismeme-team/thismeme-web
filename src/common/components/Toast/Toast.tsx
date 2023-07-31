import { slideUpDown } from "@/common/utils";

import { Icon } from "../Icon";
import { defaultToastStyle, toastColors, toastIconColors } from "./style";
import type { Toast as Props } from "./types";

export const Toast = ({ message, icon, id, color = "black", visible, ...rest }: Props) => {
  return (
    <output css={[defaultToastStyle, toastColors[color], slideUpDown(visible)]} {...rest}>
      {typeof icon === "string" ? (
        <Icon color={toastIconColors[color]} height={24} name={icon} width={24} />
      ) : (
        icon
      )}
      {typeof message === "function" ? message(id) : message}
    </output>
  );
};
