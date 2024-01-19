import type { ComponentPropsWithoutRef, ElementType } from "react";

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
  label: string;
  size?: keyof typeof sizes;
  color: keyof typeof colors;
} & ComponentPropsWithoutRef<T>;

const sizes = {
  medium: "h-36 w-fit rounded-20 px-16 py-8 font-suit text-14-semibold-140",
};

const colors = {
  white: "border-[1px] border-gray-200 bg-white text-gray-700",
  black: "bg-black text-white",
  primary:
    "bg-gray-100 text-primary-700 focus:bg-white focus:text-primary-500 hover:bg-white hover:text-primary-500 active:bg-gray-300 active:text-primary-800",
};

export const Chip = <T extends ElementType>({
  as,
  size = "medium",
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
