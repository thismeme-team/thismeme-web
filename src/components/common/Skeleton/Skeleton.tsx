import { keyframes } from "@emotion/react";
import type { ElementType, HTMLAttributes } from "react";
import tw, { css, theme } from "twin.macro";

interface Props<T extends ElementType> extends HTMLAttributes<HTMLSpanElement> {
  /**
   * 스켈레톤에 사용되는 root 컴포넌트
   * @default "span"
   */
  as?: T;
  /**
   * 스켈레톤의 너비
   */
  width?: number | string;
  /**
   * 스켈레톤의 높이
   */
  height?: number | string;
  /**
   * 렌더링 될 스켈레톤 컴포넌트의 타입
   * @default "text"
   */
  variant?: "circular" | "rectangular" | "rounded" | "text";
  /**
   * 스켈레톤 컴포넌트에 적용되는 에니메이션
   * false라면 애니매이션 효과가 없어짐
   * @default "pulse"
   */
  animation?: "pulse" | "wave" | false;
}
const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const variants = {
  rectangular: css``,
  circular: tw`rounded-full`,
  rounded: tw`rounded-[4px]`,
  text: css`
    margin-top: 0;
    margin-bottom: 0;
    height: auto;
    transform-origin: 0 55%;
    transform: scale(1, 0.60);
    border-radius: 4px / 6.7px;
    &:empty::before {
      content: "\\00a0";
    },
  `,
};

const animations = {
  pulse: css`
    animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
  `,
  wave: css`
    position: relative;
    overflow: hidden;

    /* Fix bug in Safari: https://bugs.webkit.org/show_bug.cgi?id=68196 */
    /* reference: https://www.sungikchoi.com/blog/safari-overflow-border-radius/ */
    /* webkit의 stacking context 관련 버그 */
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    &::after {
      animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
      background: linear-gradient(90deg, transparent, #ddd, transparent);
      content: "";
      position: absolute;
      transform: translateX(-100%); /* Avoid flash during server-side hydration */
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
  `,
};

export const Skeleton = <T extends ElementType = "span">({
  as,
  width,
  height,
  variant = "text",
  animation = "pulse",
  style,
  ...rest
}: Props<T>) => {
  const SkeletonRoot = as || "span";

  return (
    <SkeletonRoot
      style={{ width, height, ...style }}
      css={[
        css`
          display: block;
          background-color: ${theme`colors.gray.200`};
          height: 1.2em;
        `,
        variants[variant],
        animation && animations[animation],
      ]}
      {...rest}
    />
  );
};
