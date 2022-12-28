import type { ComponentProps } from "react";

import { Button } from "@/components/common/Button/Button";
import type { IconName } from "@/components/common/Icon";
import { Icon } from "@/components/common/Icon";

// NOTE Button의 color가 아직 확정되지 않아 className으로 넘기도록 설계
const sizes = {
  medium: "h-46 w-46 rounded-20",
};

interface Props extends ComponentProps<"button"> {
  icon: IconName;
  size: keyof typeof sizes;
}
export const IconButton = ({ icon, size, className, ...rest }: Props) => {
  return (
    <Button className={`${sizes[size]} ${className}`} size="custom" {...rest}>
      <Icon name={icon} />
    </Button>
  );
};
