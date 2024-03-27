"use client";

import type { ImageLoaderProps } from "next/image";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  const rawTransformations = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];
  let isAbsolute: boolean;
  let href: string;

  if (src.startsWith("/")) {
    href = src;
    isAbsolute = false;
  } else {
    const hrefParsed = new URL(src);
    href = hrefParsed.toString();
    isAbsolute = true;
  }

  const cldUrl = `https://res.cloudinary.com/${cloudName}/image/fetch/${rawTransformations.join(
    ",",
  )}/${href}`;

  return isAbsolute ? cldUrl : src;
}
