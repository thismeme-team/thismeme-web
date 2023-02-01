import type { ComponentPropsWithoutRef, ElementType } from "react";

type Props<T extends ElementType> = {
  as?: T;
  className?: string;
  label: string;
  size: keyof typeof sizes;
  color: keyof typeof colors;
} & ComponentPropsWithoutRef<T>;

const sizes = {
  small: "h-24 w-fit rounded-12 pl-7 pr-7 pt-5 pb-5 text-12-regular-160", // small chip이 dev2 에 없어진듯..?
  medium: "h-34 w-fit rounded-20 px-16 py-8 font-suit text-14-semibold-140",
};

const colors = {
  white: "border-[1px] border-gray-10 bg-white text-gray-20",
  darkGray: "bg-dark-gray-10 text-white",
  black: "bg-black text-white",
  lightGray: "bg-light-gray-10 text-dark-gray-10",
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
