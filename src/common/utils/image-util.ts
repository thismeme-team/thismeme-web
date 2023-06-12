/**
 * Next.js Image 컴포넌트의 마침표 인코딩 분기 처리를 위한 함수
 *
 * 예를 들어, https://exemple.com/....png 이라는 url이 있을 때 pathname 의 첫 마침표(.) 때문에
 * Image 컴포넌트의 최적화 단계 중 이미지 url 인코딩 과정에서 Next.js가 오류를 던짐
 * 이 때문에 인코딩이 안되는 url의 경우애만 Image 컴포넌트의 최적화를 제거하기 위한 함수이다
 *
 *
 * @param url  마침표 인코딩 에러 여부를 알고자 하는 url
 *
 * @returns 인코딩 에러가 발생한다면 true, 그렇지 않다면 false
 *
 * @exemple
 * <Image src={src} unoptimized={isEncodingError(src)} />
 */
export const isEncodingError = (url: string | URL) => {
  try {
    return new URL(url).pathname.at(1) === ".";
  } catch (e) {
    /**
     * URL 생성자 함수의 인자의 TypeError일때는 false를 반환한다.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/URL/URL#exceptions
     */
    return false;
  }
};
