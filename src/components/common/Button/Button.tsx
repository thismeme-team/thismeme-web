import type { ComponentPropsWithoutRef, ElementType } from "react";

/**
 * FIX tailwind classname 우선순위 문제
 * https://fe-developers.kakaoent.com/2022/220303-tailwind-tips/#tailwind-class-%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-%EC%B2%98%EB%A6%AC-%EB%B0%A9%EC%95%88
 *
 * 디자인 시스템에 따라 미리 스타일을 정의해놓으면
 * 컴포넌트 별로 커스텀이 필요할 때 스타일 우선순위 문제가 발생함
 */

const style = {
  large: "rounded-10 py-11 px-15 text-semi-bold",
  medium: "rounded-5 py-8 px-13 text-tag",
  custom: "",
};

type Props<T extends ElementType> = {
  as?: T;
  size?: keyof typeof style;
} & ComponentPropsWithoutRef<T>;

export const Button = <T extends ElementType = "button">({
  as,
  children,
  size = "custom",
  className = "",
  ...rest
}: Props<T>) => {
  const ButtonRoot = as || "button";

  return (
    <ButtonRoot
      className={`flex items-center justify-center ${style[size]} ${className}`}
      {...rest}
    >
      {children}
    </ButtonRoot>
  );
};
