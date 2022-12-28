import type { ComponentPropsWithoutRef, ElementType } from "react";

type ChipProps<T extends ElementType> = {
  as?: T;
  className?: string;
  label: string;
  size: "small" | "medium";
  type: "recent" | "recommend" | "major";
} & ComponentPropsWithoutRef<T>;

//type 과 관련된 클래스가 컬러를 다루고 있기에 color 라는 네이밍은 어떨지?
export const Chip = <T extends ElementType = "div">(props: ChipProps<T>) => {
  const { as, size, type, className, label, ...rest } = props;
  const ChipRoot = as || "div";
  return (
    <ChipRoot className={`${size} ${type} ${className}`} {...rest}>
      {label}
    </ChipRoot>
  );
};
