import Image from "next/image";
import type { ComponentProps } from "react";

interface Props extends Omit<ComponentProps<"img">, "alt" | "placeholder"> {
  src: string;
}
const base64Blur =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8/Z8BAzAOZUEAQ+ESj6kXXm0AAAAASUVORK5CYII=";

export const Fallback = ({ width = 400, height = 400, className = "", src }: Props) => {
  return (
    <div
      className={`relative overflow-hidden [&>img]:!static ${className}`}
      css={[width && height && { aspectRatio: `calc(${width} / ${height})` }]}
    >
      <Image
        fill
        priority
        alt="fallback"
        blurDataURL={base64Blur}
        placeholder="blur"
        sizes=" "
        src={src}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};
