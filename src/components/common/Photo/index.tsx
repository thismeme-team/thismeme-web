import Image from "next/image";
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"img"> {
  src: string;
}

const base64Blur =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8/Z8BAzAOZUEAQ+ESj6kXXm0AAAAASUVORK5CYII=";

const Photo = ({ src, className }: Props) => {
  return (
    <div className={`relative overflow-hidden [&>img]:!static ${className || ""}`}>
      <Image
        fill
        priority
        alt="thumbnail"
        blurDataURL={base64Blur}
        placeholder="blur"
        src={src}
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export { Photo };
