import type { ComponentProps } from "react";

import { Photo } from "../Photo";

interface Props extends Omit<ComponentProps<typeof Photo>, "alt" | "src" | "sizes"> {
  images?: { name: string; src: string }[];
}
const randomImages = [
  {
    name: "계속아름다운우정을쌓고싶고요",
    src: "/img/계속아름다운우정을쌓고싶고요.jpeg",
  },
  {
    name: "공주잘겡",
    src: "/img/공주잘겡.jpeg",
  },
  {
    name: "귀여운데요",
    src: "/img/귀여운데요.jpeg",
  },
  {
    name: "그래도좋단다",
    src: "/img/그래도좋단다.jpeg",
  },
  {
    name: "내맘인데",
    src: "/img/내맘인데.jpeg",
  },
  {
    name: "yes팻말을든박명수",
    src: "/img/yes팻말을든박명수.jpeg",
  },
];
export const RandomImage = ({ images = randomImages, className = "" }: Props) => {
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return <Photo alt={randomImage.name} className={className} sizes="32px" src={randomImage.src} />;
};
