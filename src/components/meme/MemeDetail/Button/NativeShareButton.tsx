import { IconButton } from "@/components/common/Button";

interface Props {
  title: string;
  text: string;
  url: string;
  onSuccess?: () => void;
  onError?: () => void;
}
export const NativeShareButton = ({ title, text, url, onSuccess, onError }: Props) => {
  /**
   * @todo navigator.share undefined error
   *
   * share API가 지원되는 브라우저 환경이 제한되어있음
   * - localhost
   * - https (http는 제한)
   *
   * pc chrome에서 테스트 시 chrome://flags/#web-share enabled 필요
   */

  const handleClick = () => {
    if (!navigator.share) return;
    navigator.share({ title, text, url }).then(onSuccess).catch(onError);
  };

  return (
    <IconButton
      as="li"
      className="bg-light-gray-10"
      icon="meatball"
      size="medium"
      onClick={handleClick}
    />
  );
};
