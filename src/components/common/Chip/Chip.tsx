import type { ComponentPropsWithoutRef, ElementType } from "react";

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
  label: string;
  size: keyof typeof sizes;
  color: keyof typeof colors;
} & ComponentPropsWithoutRef<T>;

const sizes = {
  medium: "h-34 w-fit rounded-16 pl-13 pr-13 pt-8 pb-8 text-15-semibold-130",
};

const colors = {
  white: "border-[1px] border-gray-200 bg-white text-gray-700",
  black: "bg-black text-white",
};

export const Chip = <T extends ElementType>({
  as,
  size,
  color,
  className = "",
  label,
  ...rest
}: Props<T>) => {
  const ChipRoot = as || "div";
  return (
    <ChipRoot className={`${sizes[size]} ${colors[color]} ${className}`} {...rest}>
      {label}
    </ChipRoot>
  );
};
