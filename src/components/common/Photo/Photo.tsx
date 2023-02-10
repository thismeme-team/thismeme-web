import Image from "next/image";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Fallback } from "./Fallback";

/**
 * NOTE
 * ComponentProps<typeof Image> 으로 타입 선언하면
 * storybook jsdoc parse 오류 발생
 * - interface 내부에 @deprecated 어노테이션이 있으면 문제 생기는 듯 보임
 */
interface Props extends Omit<ComponentProps<"img">, "placeholder"> {
  fallbackSrc?: string;
}

const base64Blur =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8/Z8BAzAOZUEAQ+ESj6kXXm0AAAAASUVORK5CYII=";

const fallback = "/img/fallbackImage.png";

export const Photo = ({
  src = "",
  alt = "thumbnail",
  className = "",
  width,
  height,
  fallbackSrc = fallback,
  ...rest
}: Props) => {
  /**
   * FIX
   * storybook 환경에서 이미지가 min height 보다 작을 때
   * cover 속성이 적용 안돼서 밑에 회색 빈 공간이 생김
   * - 개발 페이지에선 정상 동작
   *
   * NOTE
   * unoptimized 옵션 추가한 이유: 이미지 uri에 마침표(.)같은 인코딩 불가능한 문자가 포함된 경우 /_next 경로에서 이미지를 불러올 수 없는 이슈 때문
   * 서버에서 이미지 경로에 마침표같은 특수문자를 안쓰면 unoptimized 옵션 빼도됨
   */
  const [isFailLoading, setIsFailLoading] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setIsFailLoading(null);
  }, [src]);

  return (
    <ErrorBoundary
      fallbackRender={() => {
        // NOTE: encoding 오류와 같이 Image 컴포넌트 자체에서 나는 오류 잡음
        return <Fallback className={className} height={height} src={fallbackSrc} width={width} />;
      }}
    >
      <div
        className={`relative overflow-hidden [&>img]:!static ${className}`}
        css={[width && height && { aspectRatio: `calc(${width} / ${height})` }]}
      >
        <Image
          fill
          priority
          alt={alt}
          blurDataURL={base64Blur}
          placeholder="blur"
          sizes=" "
          src={isFailLoading ? fallbackSrc : src}
          style={{ objectFit: "cover" }}
          onError={setIsFailLoading}
          {...rest}
        />
      </div>
    </ErrorBoundary>
  );
};
