import { css } from "@emotion/react";
import Image from "next/image";
import type { ComponentProps } from "react";

/**
 * NOTE
 * ComponentProps<typeof Image> 으로 타입 선언하면
 * storybook jsdoc parse 오류 발생
 * - interface 내부에 @deprecated 어노테이션이 있으면 문제 생기는 듯 보임
 */
interface Props extends Omit<ComponentProps<"img">, "alt" | "placeholder" | "width" | "height"> {
  src?: string;
  width?: number;
  height?: number;
}

const base64Blur =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAEUlEQVR42mO8/Z8BAzAOZUEAQ+ESj6kXXm0AAAAASUVORK5CYII=";

const Photo = ({ src = "", className = "", width, height, ...rest }: Props) => {
  /**
   * FIXME
   * storybook 환경에서 이미지가 min height 보다 작을 때
   * cover 속성이 적용 안돼서 밑에 회색 빈 공간이 생김
   * - 개발 페이지에선 정상 동작
   *
   * 최선의 방법은 서버에서 이미지 너비, 높이를 내려주는 것이라고 생각
   * - 스켈레톤 처리하기 용이
   * - layout shift 방지
   */
  return (
    <div
      className={`relative overflow-hidden bg-gray-100 [&>img]:!static ${className}`}
      css={
        width &&
        height &&
        css`
          aspect-ratio: ${width / height};
        `
      }
    >
      <Image
        fill
        alt="thumbnail"
        blurDataURL={base64Blur}
        placeholder="blur"
        src={src}
        style={{ objectFit: "cover" }}
        {...rest}
      />
    </div>
  );
};

export { Photo };
