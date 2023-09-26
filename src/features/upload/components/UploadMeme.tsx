import { useState } from "react";

import { Icon } from "@/common/components/Icon";
import { Photo } from "@/common/components/Photo";
import { UploadMemeData } from "@/features/upload/components/UploadMemeData";

interface Props {
  src: string;
  isFocus?: boolean;
}

export const UploadMeme = ({ src, isFocus }: Props) => {
  const [height, setHeight] = useState(1000);

  return (
    <section className="relative">
      <button className="absolute top-16 left-16">
        <Icon color="gray-600" name="meatball" />
      </button>
      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className={`group w-full rounded-24 border bg-white pt-64 pb-16 
         focus-within:border-primary-500 focus:outline-none`}
        ref={(e) => {
          if (isFocus) e?.focus();
        }}
        onPointerDown={(e) => {
          if (!e.currentTarget) return;
          const h = e.currentTarget.getBoundingClientRect().height;
          if (h === 0) return;
          setHeight(h);
        }}
      >
        <Photo className="mx-16 rounded-16" src={src} />
        <UploadMemeData
          className="max-h-[100rem] overflow-hidden transition-[max-height] duration-500 ease-in-out group-[:not(:focus-within)]:max-h-0"
          css={{ maxHeight: height / 10 + "rem" }}
        />
      </div>
    </section>
  );
};
