import { css } from "twin.macro";

export const fadeInOut = (fadeIn: boolean, time = 200) => [
  css`
    transition: opacity ${time}ms ease-in-out;
  `,
  fadeIn
    ? css`
        opacity: 1;
      `
    : css`
        opacity: 0;
        pointer-events: none;
      `,
];

export const slideUpDown = (slideUp: boolean, time = 200) => [
  css`
    transition: all ${time}ms ease-in-out;
    opacity: 0.5;
    transform: translateY(200%);
  `,
  slideUp
    ? css`
        transform: translateY(0);
        opacity: 1;
      `
    : css`
        opacity: 0;
        pointer-events: none;
      `,
];
