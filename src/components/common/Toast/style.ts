import tw, { css, theme } from "twin.macro";

export const toastColors = {
  black: css`
    background: ${theme`colors.gray.800`};
    color: ${theme`colors.gray.100`};
  `,
};

export const toastIconColors = {
  black: "white",
} as const;

export const defaultToastStyle = tw`flex h-48 w-full items-center gap-4 rounded-10 px-16 font-suit text-16-semibold-140 will-change-transform`;
