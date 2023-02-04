import { css } from "twin.macro";

export const fadeInOut = (open: boolean, time = 200) => [
  css`
    transition: opacity ${time}ms ease-in-out;
  `,
  open
    ? css`
        opacity: 1;
      `
    : css`
        opacity: 0;
        pointer-events: none;
      `,
];
