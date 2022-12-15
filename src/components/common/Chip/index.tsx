import type { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
  size: "small" | "medium";
  type: "recent" | "recommend" | "major";
}

//type 과 관련된 클래스가 컬러를 다루고 있기에 color 라는 네이밍은 어떨지?
function Chip({ label, size, type, className, ...rest }: ChipProps) {
  return (
    <div className={`${size} ${type} ${className}`} {...rest}>
      {label}
    </div>
  );
}

export default Chip;
